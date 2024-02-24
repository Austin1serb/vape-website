import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Box, Typography, TextField, Button, Grid, InputAdornment, Tooltip, Switch, Dialog, DialogContent, DialogTitle, Snackbar, CircularProgress } from '@mui/material';
import { Customer } from '@/components/types';
import { EmailOutlined } from '@mui/icons-material';

//error interface object

interface Error {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    country?: string;
    message?: string;
}


interface EditCustomerModalProps {
    open: boolean;
    onClose: () => void;
    customer: Customer;
    updateCustomerList: (customer: Customer) => void;
    isViewOnly?: boolean;
}
const EditCustomerModal: React.FC<EditCustomerModalProps> = ({ open, onClose, customer, updateCustomerList, isViewOnly = false }) => {
    const [changeEmail, setChangeEmail] = useState<boolean>(false)
    const [errors, setErrors] = useState<Error>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleChangeEmail = () => {
        setChangeEmail(!changeEmail)
    }
    const handleClose = ()=>{
        onClose()
        setLoading(false)
        setErrors({})
    }

    const [formData, setFormData] = useState<Customer>({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        country: '',
        orders: [],
    });

    useEffect(() => {
        // Populate form data when the modal opens
        if (customer) {
            setFormData({
                ...customer
            });
        }
    }, [customer]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleSubmit = async () => {
        setLoading(true);
        setErrors({});
        try {
            const response = await fetch(`http://localhost:8000/api/customer/${customer._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                // This will catch any response that is not 2xx status code
                const errorData = await response.json();
                console.error('Error:', errorData.message || 'An error occurred');
                setErrors(errorData);

                setLoading(false);

                return;
            }

            const updatedCustomer = await response.json();
            updateCustomerList(updatedCustomer);
            onClose(); // Close the modal
        } catch (error) {
            console.error('Error:', error);
            // Handle errors (e.g., show a notification)
            // Optionally, return or throw the error to be handled by the caller
        }
        finally { setLoading(false); }
    };


    return (
        <Dialog open={open} onClose={onClose} >

            <DialogTitle className='bg-primary-variant text-center uppercase h-18'>Edit Customer</DialogTitle>
            <DialogContent sx={{ borderRadius: 3 }} className='bg-dark-background border-primary-variant border-4'>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>

                        <TextField
                            label="First Name"
                            name="firstName"
                            autoComplete="given-name"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            disabled={isViewOnly}
                            error={!!errors.message}
                            helperText={errors.message}
                            color={errors.firstName ? 'error' : 'primary'}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            name="lastName"
                            autoComplete="family-name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            disabled={isViewOnly}
                            error={!!errors.lastName}
                            helperText={errors.lastName}
                            color={errors.lastName ? 'error' : 'primary'}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            disabled={isViewOnly || !changeEmail}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailOutlined color='secondary' />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Switch color='secondary' checked={changeEmail} onChange={handleChangeEmail} />
                                    </InputAdornment>
                                ),
                            }}
                            helperText="This will change the email associated with the account."
                            error={!!errors.email}
                            color={errors.email ? 'error' : 'primary'}

                        />
                    </Grid>
                    {/* Address Line 1 */}
                    <Grid item xs={12}>
                        <TextField
                            label="Address"
                            fullWidth
                            name="address"
                            autoComplete="address-line1"
                            value={formData.address || ''}
                            onChange={handleInputChange}
                            disabled={isViewOnly}
                        />
                    </Grid>

                    {/* Address Line 2 */}
                    <Grid item xs={12}>
                        <TextField
                            label="Address Line 2"
                            fullWidth
                            autoComplete="address-line2"
                            name="address2"
                            value={formData.address2 || ''}
                            onChange={handleInputChange}
                            disabled={isViewOnly}
                        />
                    </Grid>

                    {/* City */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            fullWidth
                            name="city"
                            autoComplete="address-level2"
                            value={formData.city || ''}
                            onChange={handleInputChange}
                            disabled={isViewOnly}
                        />
                    </Grid>

                    {/* State */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="State"
                            fullWidth
                            name="state"
                            autoComplete="address-level1"
                            value={formData.state || ''}
                            onChange={handleInputChange}
                            disabled={isViewOnly}
                        />
                    </Grid>

                    {/* Zip Code */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Zip"
                            fullWidth
                            name="zip"
                            autoComplete="postal-code"
                            value={formData.zip || ''}
                            onChange={handleInputChange}
                            disabled={isViewOnly}
                        />
                    </Grid>

                    {/* Phone Number */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone"
                            fullWidth
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={formData.phone || ''}
                            onChange={handleInputChange}
                            disabled={isViewOnly}
                        />
                    </Grid>

                    {/* Country */}
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="country-name"
                            label="Country"
                            fullWidth
                            name="country"
                            value={formData.country || ''}
                            onChange={handleInputChange}
                            disabled={isViewOnly}
                        />
                    </Grid>
                    {/* Orders */}
                    <Grid item xs={6}>
                        <Typography
                        >
                            Orders:  {customer.orders?.length}
                        </Typography>
                    </Grid>
                    {/* Date Created */}
                    <Grid item xs={6}>
                        <Typography

                        >
                            Date Created: {customer?.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            fullWidth
                            onClick={handleSubmit}
                            variant="outlined"
                            color="primary"
                            sx={{ mt: 2 }}
                            disabled={isViewOnly||loading}
                  
                        >
                            {loading ? <CircularProgress /> : 'Save Changes'}
                            
                        </Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button
                            fullWidth
                            onClick={
                              handleClose
                            }
                            variant="outlined"
                            color="secondary"
                            sx={{ mt: 2 }}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
            {/* snackbar error message */}
            {/*<Snackbar
                open={!!errors.message}
                autoHideDuration={6000}
                onClose={() => setErrors({ message: '' })}
                message={errors.message}
            />*/}

        </Dialog>
    );
};



export default EditCustomerModal;
