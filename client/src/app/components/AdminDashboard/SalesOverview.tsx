import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { axisClasses } from '@mui/x-charts';
import OrderDetails from './OrderDetails';
import { Product, Order, Guest, Customer } from '../types';
import dynamic from 'next/dynamic';
import BarChartSkeleton from './BarChartSkeleton';
import Legend from './Legend';

const DynamicBarChart = dynamic(
    () => import('@mui/x-charts/BarChart').then((mod) => mod.BarChart),
    { ssr: false, loading: () => <BarChartSkeleton /> }
);


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
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

    const totalGuestOrders = guestData.reduce((total, guest) => total + (guest.orders?.length ?? 0), 0);


    const handleOpenDialog = (orderId: React.SetStateAction<string | null>) => {
        setCurrentOrderId(orderId);
        setIsDialogOpen(true);
    };
    
    const chartSetting = {
        yAxis: [
            {
                label: 'Total Sales ($)',

            },
        ],
        width: 1000, // Adjust the width to fit your layout
        height: 500, // Adjust the height to fit your layout
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(50px, -190px) ',
                //rotate 90 degress
            },
            // Styling for Y-axis labels
            [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
                fontSize: '26px',
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




    if (loading) {
        return <Box><CircularProgress /></Box>;
    }


    return (
        <Box sx={{ m: 5 }}>
            <Typography p={3} textAlign={'center'} variant='h4'>SALES OVERVIEW</Typography>
            <Grid container spacing={3}>
                {/* Display summary widgets */}
                <Grid item xs={6} md={4} lg={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1" gutterBottom>Total Products:</Typography>
                            <Typography variant="body2">{totalProducts}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1" gutterBottom>Total Orders:</Typography>
                            <Typography variant="body2">{totalOrders}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1" gutterBottom>Total Sales:</Typography>
                            <Typography variant="body2">{totalSales.toFixed(2)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1" gutterBottom>Pending Orders:</Typography>
                            <Typography variant="body2">{pendingOrders}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1" gutterBottom>Total Admins: </Typography>
                            <Typography variant="body2">{totalAdmins}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={2}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1" gutterBottom>Total Accounts:  </Typography>
                            <Typography variant="body2">{totalCustomers}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4} lg={6} >
                    <Card>
                        <CardContent >
                            <Typography variant="body1" gutterBottom>Recent Customer Registrations: </Typography>
                            <Typography variant="body2"> {recentCustomers.map(customer => <li key={customer._id}>{customer.firstName} {customer.lastName} - {customer.email}</li>)}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={8} lg={6}>
                    <Card>
                        <CardContent>
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

                <Grid item xs={12} md={8} lg={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="body1">Latest Orders:</Typography>
                            {/* Display recent orders */}
                            {recentOrders.map(order => (
                                <Box key={order._id}>
                                    <Typography component={Button} onClick={() => handleOpenDialog(order._id)} variant="body2">
                                        Order ID: {order._id} • Order Status: <strong>{order.orderStatus}</strong>
                                    </Typography>
                                    {currentOrderId === order._id && (
                                        <OrderDetails
                                            order={order}
                                            open={currentOrderId === order._id}
                                            onClose={() => setCurrentOrderId(null)}
                                        />
                                    )}
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>


                <Box style={{ marginTop: '40px', }}>
                    <Typography p={3} textAlign={'center'} variant='h5'>Best Sellers Data</Typography>
                    <Legend series={chartSeries} />
                </Box>

                <DynamicBarChart
                    dataset={salesData}
                    slotProps={{
                        legend: {
                            hidden: true,
                        },

                    }}
                    series={chartSeries}
                    {...chartSetting}
                />

            </Grid>
        </Box>
    );
}
export default SalesOverview;