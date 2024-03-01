import React, { useState, useEffect, Suspense } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { axisClasses } from '@mui/x-charts';
import OrderDetails from './OrderDetails';
import { Product, Order, Guest, Customer } from '../types';

import Legend from './Legend';
import BarChartSkeleton from './AdminSkeletons/BarChartSkeleton';
import DynamicBarChart from './models/DynamicBarChart';



interface SalesData {
    month: string;
    [productName: string]: number | string;
}



interface SalesOverviewProps {
    salesData: SalesData[];
    products: Product[];
    totalProducts: number;
    totalOrders: number;
    totalSales: number;
    pendingOrders: number;
    recentOrders: Order[];
    totalAdmins: number;
    totalCustomers: number;
    recentAdmins: Customer[];
    recentCustomers: Customer[];
    loading: boolean;
    orders: Order[];
    guestData: Guest[];
}


const SalesOverview: React.FC<SalesOverviewProps> = ({
    salesData,
    products,
    totalProducts,
    totalOrders,
    totalSales,
    pendingOrders,
    recentOrders,
    totalAdmins,
    totalCustomers,
    recentAdmins,
    recentCustomers,
    loading,
    orders,
    guestData,
}) => {
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const totalGuestOrders = guestData.reduce((total, guest) => total + (guest.orders?.length ?? 0), 0);


    const handleOpenDialog = (orderId: React.SetStateAction<string | null>) => {
        setCurrentOrderId(orderId);
        setDialogOpen(true);

    };
    const handleCloseDialog = () => {
        setCurrentOrderId(null);
        setDialogOpen(false);

    };

    const chartSetting = {
        yAxis: [
            {
                label: 'Total Sales ($)',

            },
        ],
        width: 1056, // Adjust the width to fit your layout
        height: 500, // Adjust the height to fit your layout
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(45px, -30px) ',
                //rotate 90 degress
            },
            // Styling for Y-axis labels
            [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {


                strokeWidth: '.7px',

            },


        },

    };

    const valueFormatter = (value: string | number): string => {
        // Convert string to number if necessary
        const numericValue = typeof value === 'string' ? parseFloat(value) : value;
        // Check if the conversion resulted in a valid number
        if (!isNaN(numericValue)) {
            return `$${numericValue.toFixed(2)}`;
        } else {
            return 'N/A'; // Return a fallback value for invalid numbers
        }
    };



    interface ChartSeriesItem {
        dataKey: string;
        label: string;
        valueFormatter: (value: number | string) => string;
        color: string;
    }

    const generateChartSeries = (salesData: SalesData[]): ChartSeriesItem[] => {
        if (salesData.length === 0) return [];

        let series = Object.keys(salesData[0]).filter(key => key !== 'month').map((key, index): ChartSeriesItem => ({
            dataKey: key,
            label: key,
            valueFormatter: valueFormatter, // Directly use the corrected valueFormatter function here
            color: ['#06B2AF', '#2E96FF', '#AA00C6', '#60009B'][index % 4]
        }));

        return series;
    };

    const chartSeries = generateChartSeries(salesData);

    useEffect(() => {

        console.log(chartSeries)
    }, [salesData])

    return (
        <Box className="m-5 rounded-lg pb-12">
            <h2 className='text-3xl text-start uppercase py-8 ml-8'>SALES OVERVIEW</h2>
            <Grid container spacing={3}>
                {/* Display summary widgets */}
                <Grid item xs={6} md={4} lg={2}>
                    <Card elevation={5} className="bg-dark-surface text-on-dark-background rounded-lg h-full">
                        <CardContent className="bg-dark-surface text-on-dark-background h-full">
                            <Typography variant="body1" gutterBottom>Total Products:</Typography>
                            <Typography variant="body2">{totalProducts}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <Card elevation={5} className="bg-dark-surface text-on-dark-background rounded-lg h-full">
                        <CardContent className="bg-dark-surface text-on-dark-background h-full">
                            <Typography variant="body1" gutterBottom>Total Orders:</Typography>
                            <Typography variant="body2">{totalOrders}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <Card elevation={5} className="bg-dark-surface text-on-dark-background rounded-lg h-full">
                        <CardContent className="bg-dark-surface text-on-dark-background h-full">
                            <Typography variant="body1" gutterBottom>Total Sales:</Typography>
                            <Typography variant="body2">{totalSales.toFixed(2)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <Card elevation={5} className="bg-dark-surface text-on-dark-background rounded-lg h-full">
                        <CardContent className="bg-dark-surface text-on-dark-background h-full">
                            <Typography variant="body1" gutterBottom>Pending Orders:</Typography>
                            <Typography variant="body2">{pendingOrders}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <Card elevation={5} className="bg-dark-surface text-on-dark-background rounded-lg h-full">
                        <CardContent className="bg-dark-surface text-on-dark-background h-full">
                            <Typography variant="body1" gutterBottom>Total Admins: </Typography>
                            <Typography variant="body2">{totalAdmins}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <Card elevation={5} className="bg-dark-surface text-on-dark-background rounded-lg h-full">
                        <CardContent className="bg-dark-surface text-on-dark-background h-full">
                            <Typography variant="body1" gutterBottom>Total Accounts:  </Typography>
                            <Typography variant="body2">{totalCustomers}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4} lg={6} >
                    <Card elevation={5} className="bg-dark-surface text-on-dark-background rounded-lg h-full">
                        <CardContent className="bg-dark-surface text-on-dark-background h-full">
                            <Typography variant="body1" gutterBottom>Recent Customer Registrations: </Typography>
                            <Typography variant="body2"> {recentCustomers.map(customer => <li key={customer._id}>{customer.firstName} {customer.lastName} - {customer.email}</li>)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8} lg={6}>
                    <Card elevation={5} className="bg-dark-surface text-on-dark-background rounded-lg h-full">
                        <CardContent className="bg-dark-surface text-on-dark-background h-full">
                            <Typography variant="body1">Guest Information:</Typography>
                            {/* Display guest data */}
                            {/*{guestData.map(guest => (
                                <Box key={guest._id}>*/}
                            <Typography variant="body2">
                                Total Guest Accounts: {guestData.length}
                            </Typography>
                            <Typography variant="body2">
                                Total Guest Orders: {totalGuestOrders}
                            </Typography>
                            <Typography variant="body2">

                            </Typography>


                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={12} lg={12} >
                    <Card elevation={5} sx={{ width: '100%' }} className="bg-dark-surface text-on-dark-background rounded-lg w-full">
                        <CardContent sx={{ width: '100%' }} className="bg-dark-surface text-on-dark-background w-full">
                            <Typography variant="body1">Latest Orders:</Typography>
                            {/* Display recent orders */}
                            <div className='flex flex-wrap justify-left '>
                                {recentOrders.map(order => (
                                    <div className='lg:w-1/2 p-2 w-full' key={order.orderNumber}> {/* Adjust padding as needed */}
                                        <Button
                                            variant='contained'
                                            onClick={() => handleOpenDialog(order._id)}
                                            color='secondary'
                                            fullWidth
                                            className='whitespace-nowrap overflow-hidden'
                                        >
                                            Order ID: {order._id} • Order Status: <span className={
                                                order.orderStatus === 'Pending' || order.orderStatus === 'Canceled' ? 'text-red-400 ' : 'text-green-300'
                                            }>
                                                {order.orderStatus}
                                            </span>
                                        </Button>
                                    </div>
                                ))}
                            </div>

                            {recentOrders.filter(order => currentOrderId === order._id).map(order => (
                                <OrderDetails
                                    key={order._id}
                                    order={order}
                                    open={dialogOpen}
                                    handleClose={handleCloseDialog}
                                />
                            ))}

                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sm={12}>
                    <Box >
                        <Typography p={3} textAlign={'center'} variant='h5'>Best Sellers Data</Typography>
                        <Legend series={chartSeries} />
                    </Box>

                    <Card elevation={5}>
                        <div className='bg-dark-surface flex-grow'>
                            
                            <Suspense fallback={<BarChartSkeleton />}>
                                <DynamicBarChart
                                    salesData={salesData}
                                    chartSeries={chartSeries}
                                    chartSetting={chartSetting}
                                />
                            </Suspense>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
export default SalesOverview;