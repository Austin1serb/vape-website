"use client"
import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, Grid, Tabs, Tab, Select, MenuItem, InputLabel, CircularProgress, FormControl, IconButton, } from '@mui/material';
import { useCart } from '../contexts/useCart';
import '../Styles/QuickView.css'
import Image from 'next/image';
import TabPanel from './TabPanel';

const customFont = "freight-display-pro, serif";
const modalStyle = {
    fontFamily: customFont,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '80vw', md: '80vw' }, // Responsive width
    maxHeight: { xs: '70vh', sm: '90vh' }, // Adjust height for mobile
    overflowY: 'auto',
    bgcolor: 'var(--color-background)',
    boxShadow: '2px -2px 23px 0',
    p: 6,

}; interface Product {
    _id: string;
    name: string;
    category: string[];
    price: number;
    imgSource: { url: string }[];
    flavor: string;
    description: string;
    specs?: string; // Assuming specs is optional
}

interface QuickViewProps {
    productId: string;
    open: boolean;
    handleClose: () => void;
    products: Product[];
}

const QuickView: React.FC<QuickViewProps> = ({ productId, open, handleClose, products }) => {
    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [flavor, setFlavor] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { addToCart } = useCart(); // Assuming useCart is correctly typed
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        // If the modal is closed, clear the product details
        if (!open) {
            setProductDetails(null);
            setSelectedImage('');
            return;
        }



        // Find the product details from the products array when the productId changes and the modal is open
        if (productId) {
            const foundProduct = products.find(product => product._id === productId);
            if (foundProduct) {
                setProductDetails(foundProduct);
                if (foundProduct.imgSource.length > 0) {
                    setSelectedImage(foundProduct.imgSource[0].url);
                }
            } else {
                console.error('Product not found');
            }
        }
    }, [productId, open, products]);

    useEffect(() => {
        if (productDetails) {
            const firstFlavor = productDetails.flavor.split(',')[0].trim();
            // Set the first flavor as the default selection
            setFlavor(firstFlavor);
            const related = products.filter(product =>
                product._id !== productDetails._id && // This ensures the current product is not included
                product.category.some(category =>
                    productDetails.category.includes(category)
                )
            ).slice(0, 3); // Only take the first 3 related products
            setRelatedProducts(related);
        }
    }, [productDetails, products]);
    useEffect(() => {
        // When productDetails is updated and has an imgSource, set the selected image
        if (productDetails && productDetails.imgSource.length > 0) {
            setSelectedImage(productDetails.imgSource[0].url);
        }
    }, [productDetails]); // Now it listens for changes in productDetails

    const handleChangeTab = (event: any, newValue: React.SetStateAction<number>) => {
        setSelectedTab(newValue);
    };

    const handleThumbnailClick = (imageUrl: React.SetStateAction<string>) => {
        setSelectedImage(imageUrl); // Update the main image displayed
    };

    //HOVER ZOOM 
    const [showLens, setShowLens] = useState<boolean>(false);
    const [lensPosition, setLensPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const lensSize = { width: 200, height: 200 };
    const zoomFactor = 2;


    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const targetRect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - targetRect.left + 60;
        const y = e.clientY - targetRect.top + 50;
        console.log(y)

        setLensPosition({
            x: x - 200 / 2,
            y: y - 200 / 2,
        });
    };




    const renderContent = () => {
        if (loading) {
            return (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </Box>
            );
        } else if (productDetails) {
            // Return the complex JSX for when productDetails are present
            return (
                <Grid container spacing={2} className="quickview-container" >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={5} md={6}>

                            <Box className='quickview-img-container'>
                                {/* Thumbnails */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 3, }}>
                                        {productDetails.imgSource.map((image, i) => (
                                            <Box
                                                key={'thumbnail:' + i}
                                                className='quickview-thumbnail-container'
                                                sx={{
                                                    visibility: {
                                                        xs: i < 3 ? 'visible' : 'hidden', // Show the first 3 on extra-small screens
                                                        sm: 'visible', // Show on small screens and above
                                                    },
                                                    borderBottom: selectedImage === image.url ? '4px solid var(--color-primary)' : '',
                                                }}
                                            >
                                                <img
                                                    key={'image'}

                                                    className='quickview-thumbnail'
                                                    src={`${image.url}`}
                                                    alt={`${productDetails.name} thumbnail ${i}`}
                                                    onClick={() => handleThumbnailClick(image.url)}

                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                    {/* Main Image displayed */}
                                    <Box
                                        className="image-container"
                                        onMouseEnter={() => setShowLens(true)}
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={() => setShowLens(false)}
                                        display={'flex'}
                                        justifyContent={'center'}

                                    >
                                        <img
                                            className='quickview-main-image'
                                            src={selectedImage}
                                            alt={productDetails.name}
                                            key={productDetails.name}
                                            width={300}
                                            height={300}
                                        />
                                    </Box>
                                </Box>

                                <Typography sx={{ display: { xs: "none", sm: 'block' } }} className='zoom-box-title'>Zoom Box</Typography>
                                <Box className='zoom-box' sx={{ display: { xs: "none", sm: 'block' } }} >

                                    {showLens && (
                                        <Box
                                            className="zoom-lens"
                                            style={{
                                                position: 'relative',

                                                width: `${lensSize.width}px`,
                                                height: `${lensSize.height}px`,
                                                overflow: 'hidden',
                                                border: '1px solid black',
                                            }}
                                        >
                                            <Image
                                                src={selectedImage}
                                                alt={productDetails.name}
                                                width={300}
                                                height={300}
                                                className='image-lens'
                                                style={{

                                                    position: 'relative',
                                                    width: `${300 * zoomFactor}px`,
                                                    height: `${300 * zoomFactor}px`,
                                                    left: `-${lensPosition.x * zoomFactor}px`, // Update based on mouse move
                                                    top: `-${lensPosition.y * zoomFactor}px`, // Update based on mouse move
                                                }}
                                            />
                                        </Box>
                                    )}
                                </Box>

                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={6} className="quickviewRightSide">
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ marginRight: '-30px' }}>
                                    <Typography sx={{ width: '100%', fontSize: { xs: 18, sm: 22 }, ml: { xs: 5, sm: 3, md: 0, }, fontFamily: customFont, fontWeight: 600 }} variant="h6" className='quickview-title'>{productDetails.name}</Typography>
                                </div>
                                <button aria-label='button' onClick={handleClose} className='quickview-close-button' >

                                    <svg height='45' width='45' fill='#282F48' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                        <path fill='#282F48' d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
                                        <path fill="white" d="M184 840h656V184H184v656zm163.9-473.9A7.95 7.95 0 0 1 354 353h58.9c4.7 0 9.2 2.1 12.3 5.7L512 462.2l86.8-103.5c3-3.6 7.5-5.7 12.3-5.7H670c6.8 0 10.5 7.9 6.1 13.1L553.8 512l122.3 145.9c4.4 5.2.7 13.1-6.1 13.1h-58.9c-4.7 0-9.2-2.1-12.3-5.7L512 561.8l-86.8 103.5c-3 3.6-7.5 5.7-12.3 5.7H354c-6.8 0-10.5-7.9-6.1-13.1L470.2 512 347.9 366.1z" />
                                        <path fill='#282F48' d="M354 671h58.9c4.8 0 9.3-2.1 12.3-5.7L512 561.8l86.8 103.5c3.1 3.6 7.6 5.7 12.3 5.7H670c6.8 0 10.5-7.9 6.1-13.1L553.8 512l122.3-145.9c4.4-5.2.7-13.1-6.1-13.1h-58.9c-4.8 0-9.3 2.1-12.3 5.7L512 462.2l-86.8-103.5c-3.1-3.6-7.6-5.7-12.3-5.7H354c-6.8 0-10.5 7.9-6.1 13.1L470.2 512 347.9 657.9A7.95 7.95 0 0 0 354 671z" />
                                    </svg>
                                </button>
                            </Box>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider', mr: { sx: 0, sm: 6, md: 15.01 } }}>
                                <Tabs sx={{ ml: { xs: 5, sm: 3, md: 0 } }} value={selectedTab} onChange={handleChangeTab} aria-label="Product details tabs" >
                                    <Tab tabIndex={0} label="Details" />
                                    <Tab tabIndex={1} label="Related" />
                                    <Tab tabIndex={3} label="Specs" />
                                </Tabs>
                            </Box>
                            {/* Content for each tab */}
                            <Box height='320px' sx={{

                            }}>
                                < TabPanel value={selectedTab} index={0} >

                                    <Box sx={{ overflow: 'auto', height: '200px', border: .1, p: 2, boxShadow: ' 1px 4px 6px -1px rgba(0, 0, 0, 0.2);' }}>

                                        <p className='quickview-description'>{productDetails.description}</p>
                                    </Box>
                                </TabPanel>
                                <TabPanel value={selectedTab} index={1}>
                                    {relatedProducts.map((product) => (
                                        <Box onClick={() => setProductDetails(product)} className='quickview-related-container' key={product._id}> {/* Use `_id` or appropriate key property */}
                                            <img className='quickview-related-img' alt='related' src={`${product.imgSource[0].url}`} />
                                            <Box component='button'>

                                                <Box className='quickview-related-name'>{product.name}</Box>

                                            </Box>

                                        </Box>
                                    ))}
                                </TabPanel>
                                <TabPanel value={selectedTab} index={2}>{productDetails.specs}</TabPanel>




                            </Box>
                            <Box className='quickview-price'>
                                Price: ${productDetails.price}

                            </Box>
                            {/* Quantity Selector */}
                            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexDirection: { xs: 'column', sm: 'row' } }}>
                                <FormControl sx={{ ml: 3, mb: 1, mr: 4 }}  >
                                    <InputLabel id="quantity-label">Qty</InputLabel>
                                    <Select
                                        labelId="quantity-label"
                                        id="quantity-select"
                                        name="quantity-select"
                                        sx={{ width: '100px', borderRadius: 0 }}
                                        value={quantity}
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        label="Qty"
                                        defaultValue={1}
                                    >
                                        {[...Array(10).keys()].map((x) => (
                                            <MenuItem key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                {/*Flavor Selector */}
                                <FormControl sx={{ width: '280px', ml: { xs: 3, sm: 0 } }}>
                                    <InputLabel id="flavor-label"  >Flavor</InputLabel>
                                    <Select
                                        labelId="flavor-label"
                                        id="flavor-select"
                                        name='flavor-select'
                                        sx={{ borderRadius: 0 }}
                                        value={flavor}

                                        onChange={(e) => setFlavor(e.target.value)}
                                        label="Flavor"
                                    >
                                        {productDetails.flavor.split(',').map((flavorOption, index) => (
                                            <MenuItem key={index} value={flavorOption.trim()}>
                                                {flavorOption.trim()}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <Button
                                    className="ml-3 border border-[#283047] bg-[#283047] text-[var(--color-primary)] font-semibold text-sm leading-tight uppercase rounded-none h-14 px-5 transition-all duration-300 ease-in-out hover:bg-[#FE6F49] hover:text-white hover:border-[#FE6F49] hover:scale-105"
                                    onClick={() => addToCart(productDetails, quantity)}
                                >
                                    Add to Cart
                                </Button>

                            </Box>
                        </Grid>
                    </Grid >


                </Grid >
            );
        }
        return null; // Or some fallback component
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className="quickview-container" sx={modalStyle}>
                {renderContent()}
            </Box>
        </Modal >
    );
};

export default QuickView;