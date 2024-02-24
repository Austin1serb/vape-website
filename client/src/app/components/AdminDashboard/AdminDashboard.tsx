
"use client"
import React, { useEffect, useState } from 'react';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import {

    Toolbar,
    Typography,
    Container,
    Grid,
    Paper,

    List,

    IconButton,
    Box,
    Menu,
    MenuItem,
    Divider,
    AppBar,
} from '@mui/material';
import ProductList from './ProductList';
import UserList from './UserList';
import OrderList from './OrderList';
import SalesOverview from './SalesOverview';
//import { useAuth } from '@/utils/useAuth';
import Link from 'next/link'
import AccountIconLocal from '@/Icons/Account.icon';
import MenuIcon from '@/Icons/MenuIcon';
import { Product, Order, Customer, Guest } from '../types'
import { SaleItem, aggregateSalesData, transformAndSortDataForChart } from './FetchDataUtil';
import { ThemeProvider, createTheme, alpha, Theme, CSSObject, styled, useTheme, } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GenerateSidebarItems from './models/GenerateSideBarItems';
import { deepPurple } from '@mui/material/colors';

const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);
const violet = {
    main: violetMain,
    light: alpha(violetBase, 0.5),
    dark: alpha(violetBase, 0.9),
    contrastText: '#9D2BFD'
}
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        secondary:deepPurple

    },
    typography: {
        fontFamily: "Montserrat, Arial"
    },
    //components: {
        
    //    MuiSwitch: {
    //        styleOverrides: {
    //            // Target the thumb of the switch when it is checked + secondary
    //            thumb: {
    //                // When the switch is in the "checked" state
    //                '&.Mui-checked': {
    //                    color: violet.main, // Change thumb color
    //                },
    //            },
    //            // Target the track of the switch when it is checked + secondary
    //            track: {
    //                // When the switch is in the "checked" state
    //                '&.Mui-checked': {
    //                    backgroundColor: violet.dark, // Change track color
    //                },
    //                // When the switch is in the "checked" + "disabled" state
    //                '&.Mui-checked + &.Mui-disabled': {
    //                    opacity: 0.5, // Adjust opacity (if needed)
    //                },
    //            },
    //            // Target the switch when it is in the secondary color
    //            switchBase: {
    //                '&.Mui-checked': {
    //                    // Change color when switch is checked (affects the thumb)
    //                    color: violet.main,
    //                    // Change the track color when the switch is checked
    //                    '+ .MuiSwitch-track': {
    //                        backgroundColor: violet.dark,
    //                    },

    //                },
    //            }
    //        }
    //    },
    //    MuiSvgIcon: {
    //        styleOverrides: {
    //            colorSecondary: {
    //                color: violet.main
    //            }
    //        }
    //    },
       
    //},

});


const drawerWidth = 275;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    border: 'none',
    boxShadow: '20px 0 20px -10px rgba(0, 0, 0, 0.5)',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    border: 'none',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const CustomDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const CustomAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));
interface MenuItem {
    icon: JSX.Element;
    text: string;
    component: string;
}
interface SalesData {
    month: string;
    [productName: string]: number | string;
}

const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
    const [selectedComponent, setSelectedComponent] = useState<string>('AdminDashboard');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    //const { isLoggedIn, logout, isAdmin } = useAuth();
    const theme = useTheme()
    const [salesData, setSalesData] = useState<SalesData[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [totalProducts, setTotalProducts] = useState<number>(0);
    const [totalOrders, setTotalOrders] = useState<number>(0);
    const [totalSales, setTotalSales] = useState<number>(0);
    const [pendingOrders, setPendingOrders] = useState<number>(0);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [totalAdmins, setTotalAdmins] = useState<number>(0);
    const [totalCustomers, setTotalCustomers] = useState<number>(0);
    const [customers, setCustomers] = useState<Customer[]>([])

    const [recentAdmins, setRecentAdmins] = useState<Customer[]>([]);
    const [recentCustomers, setRecentCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [orders, setOrders] = useState<Order[]>([]);
    const [guestData, setGuestData] = useState<Guest[]>([]);
    const url = 'http://localhost:8000/api/'




    async function fetchData<T>(url: string, signal: AbortSignal): Promise<T> {
        const response = await fetch(url, {
            method: 'GET',
            signal: signal,
            credentials: 'include', // Include credentials in the request
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        return response.json();
    };



    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchAllData = async () => {
            setLoading(true);
            try {

                // Fetch guest data
                const guestDataResponse = await fetchData<Guest[]>(url + 'guest', signal);
                setGuestData(guestDataResponse);

                // Fetch products
                const productData = await fetchData<Product[]>(url + 'product', signal);

                setProducts(productData);
                setTotalProducts(productData.length);

                // Fetch orders
                const orderData = await fetchData<Order[]>(url + 'order', signal);
                setOrders(orderData);
                const sortedOrders = orderData.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()).slice(0, 5);
                setRecentOrders(sortedOrders);
                setTotalOrders(orderData.length);

                setTotalSales(orderData.reduce((sum, order) => sum + order.totalAmount.grandTotal, 0));
                setPendingOrders(orderData.filter(order => order.orderStatus === 'Pending').length);

                // Fetch customer data
                const customerData = await fetchData<Customer[]>(url + 'customer', signal);
                setCustomers(customerData)
                // Logic for admins and customers
                const admins = customerData.filter(customer => customer.isAdmin);
                const customers = customerData.filter(customer => !customer.isAdmin);
                setTotalCustomers(customers.length);
                setRecentCustomers(customers.sort((a, b) =>
                    new Date(b.createdAt ? b.createdAt : new Date()).getTime() - new Date(a.createdAt ? a.createdAt : new Date()).getTime()
                ).slice(0, 5));
                setTotalAdmins(admins.length);
                setRecentAdmins(admins.sort((a, b) =>
                    new Date(b.createdAt ? b.createdAt : new Date()).getTime() - new Date(a.createdAt ? a.createdAt : new Date()).getTime()
                ).slice(0, 5));

                // Fetch top selling products
                const data = await fetchData<SaleItem[]>(url + 'order/best-sellers-six-months', signal);
                const aggregatedData = aggregateSalesData(data);
                const chartData = transformAndSortDataForChart(aggregatedData);
                setSalesData(chartData);
                console.log('salesData: ', salesData)
            } catch (error) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('Error fetching data:', error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();

        return () => {
            controller.abort();
        };
    }, []);




    // Function to handle menu open
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to handle menu close
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSidebarItemClick = (component: string) => {
        setSelectedComponent(component);
        setSidebarOpen(false);
    };


    const handleLogout = () => {
        //logout();
    };

    const menuId = 'primary-search-account-menu';


    return (
        <ThemeProvider theme={darkTheme}>

            <div className=" text-on-dark-background bg-dark-background ">
                <CssBaseline />
                <AppBar position="fixed"  >
                    <Toolbar sx={{ backgroundColor: 'var(--color-primary-variant)', justifyContent: 'space-between', }} >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawr"
                            onClick={handleSidebarToggle}
                            sx={{
                                color: 'white', transition: '0.3s color ease', '&:hover': {
                                    transition: '0.3s color ease', color: '#FE6F49',


                                }
                            }}


                        >
                            <MenuIcon height={32} width={32} />
                        </IconButton>
                        <Typography variant="h1" component="h1" sx={{ fontSize: 'h6.fontSize' }} className='uppercase font-medium'>Admin Dashboard</Typography>
                        <Box onClick={handleMenuOpen}>
                            <IconButton
                                size="large"
                                edge="end"
                                aria-label="account of current user"
                                sx={{ color: 'white', transition: '0.3s color ease', '&:hover': { transition: '0.3s color ease', color: '#FE6F49' } }}
                            >
                                <AccountIconLocal height={32} width={32} />
                            </IconButton>
                        </Box>
                        {/* The menu */}
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            id={menuId}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            sx={{ mt: 4, ml: 3 }}

                        >
                            {/* Menu items */}
                            <MenuItem key="home" onClick={handleMenuClose} >
                                <Link style={{ textDecoration: 'none' }} href={'/'}>Home</Link>
                            </MenuItem>
                            <MenuItem key="admin" onClick={handleMenuClose}>
                                <Link style={{ textDecoration: 'none' }} href={'/customer/admin'}>Admin</Link>
                            </MenuItem>

                            <MenuItem key="account" onClick={handleMenuClose}>
                                <Link style={{ textDecoration: 'none' }} href={'/details'}>Account</Link>
                            </MenuItem>
                            <MenuItem key="logout" onClick={handleLogout}>
                                <span style={{ textDecoration: 'none', cursor: 'pointer' }}>Logout</span>
                            </MenuItem>


                        </Menu>
                    </Toolbar>
                </AppBar>
                <Container className='mt-16'>
                    <Grid container spacing={3} >
                        <Grid item xs={12}>
                            <Paper className=' text-[var(--color-on-dark-background)] bg-[var(--color-dark-background)]'
                            >

                                {selectedComponent === 'AdminDashboard' && (
                                    <SalesOverview
                                        salesData={salesData}
                                        products={products}
                                        totalProducts={totalProducts}
                                        totalOrders={totalOrders}
                                        totalSales={totalSales}
                                        pendingOrders={pendingOrders}
                                        recentOrders={recentOrders}
                                        totalAdmins={totalAdmins}
                                        totalCustomers={totalCustomers}
                                        recentAdmins={recentAdmins}
                                        recentCustomers={recentCustomers}
                                        loading={loading}
                                        orders={orders}
                                        guestData={guestData}

                                    />)}
                                {selectedComponent === 'productList' && <ProductList />}
                                {selectedComponent === 'userList' && (
                                    <UserList
                                        customers={customers}
                                        guests={guestData}

                                    />)}
                                {selectedComponent === 'orderList' && (
                                    <OrderList
                                        orders={orders}
                                    />)}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <CustomDrawer variant="permanent" anchor="left" open={sidebarOpen} onClose={handleSidebarToggle}

                >
                    <DrawerHeader sx={{ backgroundColor: 'var(--color-primary-variant)' }} className='h-[70px]' >
                        <IconButton onClick={handleSidebarToggle}>
                            {!sidebarOpen === true ? <ChevronRightIcon sx={{ fontSize: 30 }} /> : <ChevronLeftIcon sx={{ fontSize: 30 }} />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List className="bg-dark-surface text-on-dark-background h-full shadow-lg">
                        <GenerateSidebarItems
                            sideBarOpen={sidebarOpen}
                            handleSidebarItemClick={handleSidebarItemClick} />
                    </List>
                </CustomDrawer>
            </div>
        </ThemeProvider >
    );
};

export default AdminDashboard;
