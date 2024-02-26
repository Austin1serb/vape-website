import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { TextField, Select, MenuItem, Snackbar, FormControl, InputLabel, Box, Typography, CardContent, Button, SelectChangeEvent } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import OrderDetails from './OrderDetails';
import { Order } from '../types';


interface OrderListProps {
    orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
    const [filterCriteria, setFilterCriteria] = useState<string>('');
    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // Assuming data is already loaded
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);


    // Function to handle dialog close
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };




    useEffect(() => {
        setFilteredOrders(orders); // Default to showing all orders initially
    }, []);


    // Function to handle order deletion
    const handleDeleteOrder = (orderId: string) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this order? - It will be permanently deleted');
        setLoading(true);
        if (isConfirmed) {
            fetch(`http://localhost:8000/api/order/${orderId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then(() => {
                    // Update orders state to remove the deleted order
                    const updatedOrders = orders.filter(order => order._id !== orderId);

                    setFilteredOrders(updatedOrders);
                    setLoading(false);
                    setSnackbarMessage('Order deleted successfully');
                    setSnackbarOpen(true);
                })
                .catch((error) => {
                    console.error('Error deleting order:', error);
                    setSnackbarMessage('Error deleting order');
                    setSnackbarOpen(true);
                    setLoading(false);
                });
        };
    };
    // Use this effect to filter and update filteredOrders
    useEffect(() => {
        filterOrders();

    }, [searchKeyword, filterCriteria,]);





    const filterOrders = (fetchedOrders = orders) => {
        const filtered = fetchedOrders.filter((order) => {
            const keyword = searchKeyword.toLowerCase();
            // Combine all product names into a single string
            const productNames = order.products
                .map((product) => product.name.toLowerCase())
                .join(' ');

            return (
                (filterCriteria === '' || order.orderStatus === filterCriteria) &&
                (keyword === '' ||
                    order._id.toLowerCase().includes(keyword) ||
                    order.customer.toLowerCase().includes(keyword) ||
                    order.orderDate.toLowerCase().includes(keyword) ||
                    order.orderStatus.toLowerCase().includes(keyword) ||
                    order.address?.toLowerCase().includes(keyword) ||
                    order.shippingMethod.provider?.toLowerCase().includes(keyword) ||
                    productNames.includes(keyword)
                )
            );
        });
        setFilteredOrders(filtered);
    };






    const handleOrderStatusChange = (event: SelectChangeEvent<any>, orderId: any) => {
        if (event && event.target) {
            const newStatus = event.target.value;
            setLoading(true);
            // Send a PUT request to update the order status
            fetch(`http://localhost:8000/api/order/${orderId}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderStatus: newStatus }),
            })
                .then((response) => response.json())
                .then((updatedOrder) => {
                    // Update the order status in the client-side state
                    const updatedOrders = orders.map((order) => {
                        if (order._id === updatedOrder._id) {
                            return { ...order, orderStatus: updatedOrder.orderStatus };
                        } else {
                            return order;
                        }
                    });
                    setFilteredOrders(updatedOrders)
                    // Show a success message to the user
                    setSnackbarMessage(`Order status updated to ${updatedOrder.orderStatus}`);
                    setSnackbarOpen(true);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error updating order status:', error);
                    setLoading(false);
                    // Show an error message to the user
                    setSnackbarMessage('Error updating order status');
                    setSnackbarOpen(true);
                });
        }
    };




    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleDetailsClick = (order: React.SetStateAction<Order | null>) => {
        setSelectedOrder(order);
        setIsDialogOpen(true)
    };




    const columns: GridColDef[] = [
        {
            field: '_id',
            headerName: 'Order ID',
            flex: 2,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },

        {
            field: 'customer',
            headerName: 'Customer ID',
            flex: 1.5,
            renderCell: (params) => (
                <Tooltip title={params.value}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {params.value}
                    </div>
                </Tooltip>
            ),
        },

        {
            field: 'orderDate',
            headerName: 'Order Date',
            flex: 1,
            valueFormatter: ({ value }) => new Date(value).toLocaleDateString(),
        },
        {
            field: 'address',
            headerName: 'Shipping To',
            flex: 1.5,

        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1.5,
            renderCell: (params) => (
                <Box>

                    <Button
                        sx={{ fontSize: 10, p: 1 }}
                        variant="contained"
                        onClick={() => handleDetailsClick(params.row)}
                    >
                        Details
                    </Button>
                    <Button sx={{ fontSize: 10, m: 1, p: 1 }} variant="contained" color="secondary" onClick={() => handleDeleteOrder(params.row._id)}>
                        Delete
                    </Button>
                </Box>
            )
        },


        {
            field: 'orderStatus',
            headerName: 'Order Status',
            flex: 1.5,
            renderCell: (params) => (
                <Select
                    fullWidth
                    sx={{ height: 50, ml: -1, }}
                    value={params.row.orderStatus}
                    onChange={(e) => handleOrderStatusChange(e, params.row._id)}

                >
                    <MenuItem value="Pending"  >
                        <div style={{ whiteSpace: 'nowrap', display: 'flex' }}>
                        <svg  stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path fill="#CFD8DC" d="M12,40V20h32v20c0,2.2-1.8,4-4,4H16C13.8,44,12,42.2,12,40z"></path><path fill="#78909C" d="M44,16v6H12v-6c0-2.2,1.8-4,4-4h24C42.2,12,44,13.8,44,16z"></path><g fill="#37474F"><circle cx="37" cy="16" r="3"></circle><circle cx="20" cy="16" r="3"></circle></g><g fill="#B0BEC5"><path d="M37,10c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2s2-0.9,2-2v-4C39,10.9,38.1,10,37,10z"></path><path d="M20,10c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2s2-0.9,2-2v-4C22,10.9,21.1,10,20,10z"></path></g><rect x="32" y="34" fill="#90A4AE" width="4" height="4"></rect><rect x="26" y="34" fill="#90A4AE" width="4" height="4"></rect><rect x="20" y="34" fill="#90A4AE" width="4" height="4"></rect><rect x="32" y="28" fill="#90A4AE" width="4" height="4"></rect><rect x="26" y="28" fill="#90A4AE" width="4" height="4"></rect><rect x="20" y="28" fill="#90A4AE" width="4" height="4"></rect><circle fill="#F44336" cx="16" cy="15" r="12"></circle><circle fill="#eee" cx="16" cy="15" r="9"></circle><rect x="15" y="8" width="2" height="7"></rect><rect x="16.9" y="14.2" transform="matrix(-.707 .707 -.707 -.707 42.506 16.192)" width="1.9" height="5.4"></rect><circle cx="16" cy="15" r="1.5"></circle></svg>

                            Pending
                        </div>
                    </MenuItem>
                    <MenuItem value="Shipped">
                        <div style={{ whiteSpace: 'nowrap', display: 'flex' }}>

                            <svg height='24' version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
                                <path fill="#0FA0E0" d="M43,36H29V14h10.6c0.9,0,1.6,0.6,1.9,1.4L45,26v8C45,35.1,44.1,36,43,36z" />
                                <path fill="#0F75E0" d="M29,36H5c-1.1,0-2-0.9-2-2V9c0-1.1,0.9-2,2-2h22c1.1,0,2,0.9,2,2V36z" />
                                <g fill="#37474F">
                                    <circle cx="37" cy="36" r="5" />
                                    <circle cx="13" cy="36" r="5" />
                                </g>
                                <g fill="#78909C">
                                    <circle cx="37" cy="36" r="2" />
                                    <circle cx="13" cy="36" r="2" />
                                </g>
                                <path fill="#37474F" d="M41,25h-7c-0.6,0-1-0.4-1-1v-7c0-0.6,0.4-1,1-1h5.3c0.4,0,0.8,0.3,0.9,0.7l1.7,5.2c0,0.1,0.1,0.2,0.1,0.3V24 C42,24.6,41.6,25,41,25z" />
                                <polygon fill="#DCEDC8" points="21.8,13.8 13.9,21.7 10.2,17.9 8,20.1 13.9,26 24,15.9" />
                            </svg>Shipped
                        </div>
                    </MenuItem>
                    <MenuItem value="Delivered" >
                        <div style={{ whiteSpace: 'nowrap', display: 'flex' }}>

                            <svg height='24' version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
                                <polygon fill="#43A047" points="40.6,12.1 17,35.7 7.4,26.1 4.6,29 17,41.3 43.4,14.9" />
                            </svg> Delivered
                        </div>
                    </MenuItem>
                    <MenuItem value="Canceled">
                        <div style={{ whiteSpace: 'nowrap', display: 'flex' }}>

                            <svg height='24' version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" enableBackground="new 0 0 48 48">
                                <path fill="#D50000" d="M24,6C14.1,6,6,14.1,6,24s8.1,18,18,18s18-8.1,18-18S33.9,6,24,6z M24,10c3.1,0,6,1.1,8.4,2.8L12.8,32.4 C11.1,30,10,27.1,10,24C10,16.3,16.3,10,24,10z M24,38c-3.1,0-6-1.1-8.4-2.8l19.6-19.6C36.9,18,38,20.9,38,24C38,31.7,31.7,38,24,38 z" />
                            </svg> Canceled
                        </div>
                    </MenuItem>
                </Select>
            ),
        },
    ];


    //if (loading) {
    //    return (
    //        <div className="m-3 py-5">
    //            <div className="w-1/5 h-12 bg-gray-500 rounded m-4"></div>
    //            <div className="flex justify-between p-4 rounded bg-dark-surface text-on-dark-background ">

    //                <div className="w-3/4 h-12 bg-gray-500 rounded"></div>
    //                <div className="w-1/5 h-12 bg-gray-500 rounded"></div>
    //            </div>
    //            <DataGridSkeleton />
    //        </div>
    //    );
    //}

    return (

        <div className="bg-dark text-on-dark-background m-4 py-4">
            <Typography variant="h4" gutterBottom>Order List </Typography>

            <div className='mb-5 bg-dark-surface rounded-lg'>
                <CardContent className="py-4 rounded-lg bg-dark-surface">
                    <div className="flex items-center justify-between bg-dark-surface rounded-lg">
                        <div className='w-full mr-8'>
                        <TextField
                            fullWidth
                            name='searchBar'
                            color='secondary'
                            label="Search by keyword"
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        </div>
                        <FormControl color='secondary'  sx={{ width: '20%' }}>
                            <InputLabel className="bg-dark-surface px-2">Order Status</InputLabel>
                            <Select color='secondary'  value={filterCriteria} onChange={(e) => setFilterCriteria(e.target.value)}
                                defaultValue='All Orders'>
                                <MenuItem value="">All Orders</MenuItem>
                                <MenuItem value="Pending">Pending</MenuItem>
                                <MenuItem value="Shipped">Shipped</MenuItem>
                                <MenuItem value="Delivered">Delivered</MenuItem>
                                <MenuItem value="Canceled">Canceled</MenuItem>
                                {/* Add more filter options based on order status */}
                            </Select>
                        </FormControl>
                    </div>
                </CardContent>
            </div>
            <DataGrid
                getRowId={(row) => row._id}
                rows={filteredOrders}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
            />
            {/* Snackbar for success/error messages */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
            {
                filteredOrders.length === 0 && !loading && <Typography variant='h4' sx={{ textAlign: "center" }} >No orders found based on the current filter/search criteria.</Typography>
            }
            {selectedOrder && <OrderDetails order={selectedOrder} open={isDialogOpen}
                handleClose={handleCloseDialog} />}
        </div>

    );
};

export default OrderList;
