import React, { useState, useEffect } from 'react';
import { Modal, Box, Grid, CircularProgress } from '@mui/material';
import { useCart } from '../../contexts/useCart';
import styles from './QuickView.module.css'; // Fix typo in module
import Image from 'next/image';
import ImageWithZoom from './ImageWithZoom';
import ProductDetails from './ProductDetails';
import { Product } from '../types';

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
};


interface QuickViewProps {
    productId: string;
    open: boolean;
    handleClose: () => void;
    products: Product[];
}

const QuickView: React.FC<QuickViewProps> = ({ productId, open, handleClose, products }) => {
    const [productDetails, setProductDetails] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [flavor, setFlavor] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { addToCart } = useCart(); // Assuming useCart is correctly typed

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
        // When productDetails is updated and has an imgSource, set the selected image
        if (productDetails && productDetails.imgSource.length > 0) {
            setSelectedImage(productDetails.imgSource[0].url);
        }
    }, [productDetails]); // Now it listens for changes in productDetails


    const handleThumbnailClick = (imageUrl: React.SetStateAction<string>) => {
        setSelectedImage(imageUrl); // Update the main image displayed
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
                <Grid container spacing={2} className={styles.quickviewContainer}>
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={5} md={6}>
                            <Box className={styles.quickviewImgContainer}>
                                {/* Thumbnails */}
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', ml: 3 }}>
                                        {productDetails.imgSource.map((image, i) => (
                                            <Box
                                                key={'thumbnail:' + i}
                                                className={styles.quickviewThumbnailContainer}
                                                sx={{
                                                    visibility: {
                                                        xs: i < 3 ? 'visible' : 'hidden', // Show the first 3 on extra-small screens
                                                        sm: 'visible', // Show on small screens and above
                                                    },
                                                    borderBottom: selectedImage === image.url ? '4px solid var(--color-primary)' : '',
                                                    position: 'relative'
                                                }}
                                            >
                                                <Image
                                                    key={'image'}
                                                    className={styles.quickviewThumbnail}
                                                    src={image.url}
                                                    alt={`${productDetails.name} thumbnail ${i}`}
                                                    onClick={() => handleThumbnailClick(image.url)}
                                                    fill

                                                    sizes="5vw"
                                                />
                                            </Box>
                                        ))}
                                    </Box>
                                    {/* Main Image displayed */}
                                    <div className='mt-16'>
                                    <ImageWithZoom
                                        src={selectedImage}
                                        alt={productDetails.name}
                                        width={300} // Set to your desired width
                                        height={300} // Set to your desired height
                                        vw={30}
                                    />
                                    </div>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={7} md={6} className={styles.quickviewRightSide}>
                            <ProductDetails productDetails={productDetails} quantity={0} flavor={flavor} setFlavor={setFlavor} addToCart={addToCart} handleClose={handleClose} setProductDetails={setProductDetails} products={products} />
                        </Grid>
                    </Grid>
                </Grid>
            );
        }

    };

    return (
        <Modal open={true} onClose={handleClose}>
            <Box className={styles.quickviewContainer} sx={modalStyle}>
                {renderContent()}
            </Box>
        </Modal>
    );
};

export default QuickView;
