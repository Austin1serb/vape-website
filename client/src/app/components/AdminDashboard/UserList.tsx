import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditCustomerModal from './models/EditCustomerModal';
import dynamic from 'next/dynamic';
import DataGridSkeleton from './DataGridSkeleton';
import { GridColDef } from '@mui/x-data-grid';
import { Customer, Guest } from '../types';

const DataGrid = dynamic(() => import('@mui/x-data-grid').then((mod) => mod.DataGrid), {
    loading: () => <DataGridSkeleton />,
    ssr: true,
});

interface UsersState {
    customers: Customer[];
    guests: Guest[];
}

const UserList: React.FC<UsersState> = ({ customers, guests }) => {
    const [editCustomerModalOpen, setEditCustomerModalOpen] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [users, setUsers] = useState<UsersState>({ customers: customers, guests: guests });
    const [error, setError] = useState<string | null>(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const [userTypeToDelete, setUserTypeToDelete] = useState<'customer' | 'guest' | null>(null);
    const [viewMode, setViewMode] = useState<boolean>(false);

    // Function definitions remain the same as they don't need explicit type annotations in most cases
    // However, for better type checking, you can annotate parameters and return types where applicable

    const handleDeleteUser = (userId: string, userType: 'customer' | 'guest') => {
        setUserToDelete(userId);
        setUserTypeToDelete(userType);
        setDeleteConfirmationOpen(true);
    };

    const confirmDeleteUser = async () => {
        if (!userToDelete || !userTypeToDelete) {
            console.error("Missing user ID or type for deletion.");
            return;
        }

        const url = userTypeToDelete === 'customer'
            ? `http://localhost:8000/api/customer/${userToDelete}`
            : `http://localhost:8000/api/guest/${userToDelete}`;

        try {
            await fetchData(url, { method: 'DELETE' });
            setUsers(prev => {
                // Explicitly handle each case to ensure type safety
                const updatedCustomers = userTypeToDelete === 'customer'
                    ? prev.customers.filter((customer) => customer._id !== userToDelete)
                    : prev.customers;
                const updatedGuests = userTypeToDelete === 'guest'
                    ? prev.guests.filter((guest) => guest._id !== userToDelete)
                    : prev.guests;

                return {
                    customers: updatedCustomers,
                    guests: updatedGuests,
                };
            });
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };





    interface FetchOptions extends RequestInit {
        headers?: Record<string, string>;
    }

    async function fetchData<T = any>(url: string, options: FetchOptions = {}): Promise<T> {
        setError(null);
        try {
            const response = await fetch(url, {
                ...options,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.json() as T;
        } catch (error) {
            console.error('Fetch Error:', error);
            setError('An error occurred while fetching data');
            throw error;
        }
    }



    const handleMakeAdmin = (customerId: string) => {
        fetchData(`http://localhost:8000/api/customer/${customerId}`, {
            method: 'PUT',
            body: JSON.stringify({ isAdmin: true })
        })
            .then((updatedCustomer) => {
                setUsers(prevUsers => ({
                    ...prevUsers,
                    customers: prevUsers.customers.map(customer =>
                        customer._id === customerId ? { ...customer, isAdmin: true } : customer
                    )
                }));
            })
            .catch(error => {
                console.error('Error:', error);
                setError('An Error occured while making admin');
            });
    };

    const handleRemoveFromAdmin = (adminId: string | null) => {
        if (admins.length <= 1) {
            alert("You cannot remove the last admin.");
            return;
        }
        if (adminId === localStorage.getItem('customerId')) {
            alert("You cannot remove yourself as an admin.");
            return;
        }

        fetchData(`http://localhost:8000/api/customer/${adminId}`, {
            method: 'PUT',
            body: JSON.stringify({ isAdmin: false })
        }
        )
            .then(() => {
                setUsers(prevUsers => {
                    if (!prevUsers || !prevUsers.customers) {
                        console.error("Customers data is undefined");
                        return prevUsers; // Early return if customers data is undefined
                    }

                    return {
                        ...prevUsers,
                        customers: prevUsers.customers.map(customer =>
                            customer._id === adminId ? { ...customer, isAdmin: false } : customer
                        )
                    };
                });
            })
            .catch(error => {
                console.error('Error:', error);
                setError('An Error occured while removing admin');
            });
    };



    const updateCustomerInList = (updatedCustomer: Customer) => {
        setUsers(prevUsers => ({
            ...prevUsers,
            customers: prevUsers.customers.map(customer =>
                customer._id === updatedCustomer._id ? updatedCustomer : customer
            )
        }));
    };


    const handleEditCustomer = (customer: React.SetStateAction<Customer | null>) => {
        setSelectedCustomer(customer);
        setEditCustomerModalOpen(true);
        setViewMode(false)
    };
    const handleViewGuestDetails = (guest: React.SetStateAction<Customer | null>) => {
        setSelectedCustomer(guest);
        setEditCustomerModalOpen(true);
        setViewMode(true)
    };


    // Filter customers to separate admins and non-admins
    const admins = users.customers.filter(customer => customer.isAdmin);
    const nonAdmins = users.customers.filter(customer => !customer.isAdmin);




    const buttonStyles = {
        fontSize: '10px',
        margin: '5px',
    }

    const adminCols: GridColDef[] = [
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            renderCell: (params) => (
                <div>{params.row.firstName} {params.row.lastName}</div>
            )
        },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: '_id', headerName: 'ID', flex: 1.25 },
        { field: 'createdAt', headerName: 'Registration Date', flex: 0.75, valueFormatter: ({ value }) => new Date(value).toLocaleDateString(), },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1.5,
            renderCell: (params) => (
                <div>
                    <Button
                        sx={buttonStyles}
                        variant="outlined"
                        color='secondary'
                        onClick={() => handleEditCustomer(params.row)}


                    >
                        Edit
                    </Button>
                    <Button
                        sx={buttonStyles}
                        variant="outlined"
                        color="error"
                        onClick={() => handleRemoveFromAdmin(params.row._id)}
                        disabled={admins.length <= 1}
                    >
                        Remove Admin
                    </Button>


                </div>
            ),
        },
    ];


    const customerCols: GridColDef[] = [
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            renderCell: (params) => (
                <div>{params.row.firstName} {params.row.lastName}</div>
            )
        },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: '_id', headerName: 'ID', flex: 1.25 },
        { field: 'createdAt', headerName: 'Registration Date', flex: 1, valueFormatter: ({ value }) => new Date(value).toLocaleDateString(), },
        {
            field: 'makeAdmin',
            headerName: 'Make Admin',
            flex: 1.5,
            renderCell: (params) => (
                !params.row.isAdmin && (
                    <>
                        <Button
                            sx={buttonStyles}
                            variant="outlined"
                            color='secondary'
                            onClick={() => handleEditCustomer(params.row)}

                        >
                            Edit
                        </Button>
                        <Button
                            sx={buttonStyles}
                            variant="outlined"
                            color="primary"
                            onClick={() => handleMakeAdmin(params.row._id)}
                        >
                            Make Admin
                        </Button>
                        <Button
                            sx={buttonStyles}
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteUser(params.row._id, 'customer')}
                        >
                            Delete User
                        </Button>
                    </>

                )
            ),
        },
    ];



    const guestCols: GridColDef[] = [
        {
            field: 'fullName',
            headerName: 'Full Name',
            flex: 1,
            renderCell: (params) => (
                <div>{params.row.firstName} {params.row.lastName}</div>
            )
        },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: '_id', headerName: 'ID', flex: 1.25 },
        { field: 'createdAt', headerName: 'Registration Date', flex: 1, valueFormatter: ({ value }) => new Date(value).toLocaleDateString(), },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1.5,
            renderCell: (params) => (
                <>
                    <Button
                        sx={buttonStyles}
                        variant="outlined"
                        color="primary"
                        onClick={() => handleViewGuestDetails(params.row)}
                    >
                        View Details
                    </Button>
                    <Button
                        sx={buttonStyles}
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteUser(params.row._id, 'guest')}
                    >
                        Delete Guest
                    </Button>
                </>
            ),
        },


    ];
    return (
        <div style={{ padding: 20, margin: 20 }}>
            <Dialog
                open={deleteConfirmationOpen}
                onClose={() => setDeleteConfirmationOpen(false)}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteUser} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <h2 style={{ margin: 10 }}>Admin List</h2>
            <DataGrid

                rows={admins}
                columns={adminCols}
                autoHeight
                disableRowSelectionOnClick
                getRowId={(row) => row._id}
            />
            {/* error ui */}
            {!error && (
                <div style={{ color: 'red', margin: 10 }}>
                    {error}
                </div>
            )}
            <h2 style={{ margin: 10 }}>Customer List</h2>
            <DataGrid
                rows={nonAdmins}
                columns={customerCols}
                autoHeight
                disableRowSelectionOnClick
                getRowId={(row) => row._id}
            />
            <div>
                <h2 style={{ margin: 10 }}>Guest User List</h2>
                <DataGrid
                    rows={users.guests}
                    columns={guestCols}
                    autoHeight
                    disableRowSelectionOnClick
                    getRowId={(row) => row._id}
                />
            </div>

            {editCustomerModalOpen && (
                <EditCustomerModal
                    open={editCustomerModalOpen}
                    onClose={() => setEditCustomerModalOpen(false)}
                    customer={selectedCustomer}
                    updateCustomerList={updateCustomerInList}
                    isViewOnly={viewMode} // Add this line
                />
            )}


        </div>
    );
};

export default UserList;
