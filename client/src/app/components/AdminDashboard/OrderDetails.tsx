import { Button, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import React, { Suspense } from 'react';
import { Order } from '../types';
import AdminProductCard from './models/AdminProductCard';
import AdminProductCardSkeleton from './AdminSkeletons/AdminProductSkeleton';

interface Props {
    order: Order;
    open: boolean;
    handleClose: () => void;
}

const OrderDetails: React.FC<Props> = ({ order, open, handleClose }) => {
    return (
        <Dialog open={open} maxWidth="lg" fullWidth >
            <DialogTitle className='bg-primary-variant text-center relative uppercase h-18'>
                Order Details
                <IconButton color='secondary' className="cart-close-icon absolute right-4 top-1" onClick={handleClose} >
                    {/* CLOSE ICON */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="40" width="40"><path d="m10.458 31.458-1.916-1.916 9.5-9.542-9.5-9.542 1.916-1.916 9.542 9.5 9.542-9.5 1.916 1.916-9.5 9.542 9.5 9.542-1.916 1.916-9.542-9.5Z"  /></svg>
                </IconButton>
            </DialogTitle>
            <DialogContent sx={{borderRadius:2}} className="bg-dark-background border-primary-variant border-4" dividers>
                <Grid container spacing={2} alignItems="stretch">
                    {/* First Row */}
                    <Grid item xs={12} md={4}>
                        <Card className=' w-full h-full'>
                            <CardContent className="bg-dark-surface w-full h-full">
                                <Typography variant="body1" gutterBottom><strong className='text-deep-purple-A100 uppercase'>Customer Details:</strong></Typography>
                                <Typography variant="body2">Email: {order.customerEmail}</Typography>
                                <Typography variant="body2">Customer ID: {order.createdBy}</Typography>
                                <Typography variant="body2">{order.notes ? `Order Notes: ${order.notes}` : "No Order Notes"}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className=' w-full h-full'>
                            <CardContent className="bg-dark-surface w-full h-full">
                                <Typography variant="body1" gutterBottom><strong className='text-deep-purple-A100 uppercase'>Order Total:</strong> <span className='text-green-300'>${order.totalAmount.grandTotal?.toFixed(2)}</span></Typography>
                                <Typography variant="body2">Subtotal: ${order.totalAmount.subTotal?.toFixed(2)}</Typography>
                                <Typography variant="body2">Tax: ${order.totalAmount.tax?.toFixed(2)}</Typography>
                                <Typography variant="body2">Shipping: ${order.totalAmount.shippingCost?.toFixed(2)}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card className=' w-full h-full'>
                            <CardContent className="bg-dark-surface w-full h-full">
                                <Typography variant="body1" gutterBottom> <strong className='text-deep-purple-A100 uppercase'>Order Status:</strong>
                                    <span className={order.orderStatus === 'Pending' || order.orderStatus === 'Canceled' ? 'text-red-400' : 'text-green-300'}> {order.orderStatus}</span></Typography>
                                <Typography variant="body2">Order Placed: {new Date(order.orderDate).toLocaleDateString()}</Typography>
                                <Typography variant="body2">Transaction Id: {order.transactionId}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Second Row */}
                    <Grid item xs={12} md={6}>
                        <Card className=' w-full h-full'>
                            <CardContent className="bg-dark-surface w-full h-full">
                                <Typography variant="body1" gutterBottom><strong className='text-deep-purple-A100 uppercase'>{order.shippingMethod.provider} {order.shippingMethod.type}</strong></Typography>
                                <Typography variant="body2">Print Label: <Button color='secondary' variant='text' onClick={() => window.open(order.shippingMethod.labelUrl)}>Get Label</Button></Typography>
                                <Typography variant="body2">Tracking Details: <Button color='secondary' variant='text' onClick={() => window.open(order.shippingMethod.trackingUrl)}>Tracking Details</Button></Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card className='w-full h-full'>
                            <CardContent className="bg-dark-surface w-full h-full">
                                <Typography variant="body1" gutterBottom><strong className='text-deep-purple-A100 uppercase'>Ship to:</strong></Typography>
                                <Typography variant="body2">{order.address}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Third Row - Products Ordered */}
                    {order.products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={12} lg={12} key={index}>
                            <Suspense fallback={<AdminProductCardSkeleton/>}>
                            <AdminProductCard product={product} />
                            </Suspense>
                        </Grid>
                    ))}


                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'end' }}>
                        <Button variant='outlined' color='primary' onClick={handleClose}>Close</Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default OrderDetails;
