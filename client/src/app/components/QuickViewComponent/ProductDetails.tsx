import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Tabs, Tab } from '@mui/material';
import { Product } from '../types'; 
import styles from './QuickView.module.css'; 
import TabPanel from './TabPanel';
import ProductDetailsSkeleton from './ProductDetailsSkeleton';
interface ProductDetailsProps {
    productDetails: Product;
    quantity: number;
    flavor: string;
    setFlavor: React.Dispatch<React.SetStateAction<string>>;
    addToCart: (product: Product, quantity: number) => void;
    handleClose: () => void;
    setProductDetails: React.Dispatch<React.SetStateAction<Product | null>>;
    products: Product[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    productDetails,
    flavor,
    setFlavor,
    addToCart,
    handleClose,
    setProductDetails,
    products
}) => {

    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
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

    const handleChangeTab = (event: any, newValue: React.SetStateAction<number>) => {
        setSelectedTab(newValue);

    };
    if (!productDetails) {
        return <ProductDetailsSkeleton/>;
    }else

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <h6 className={styles.quickviewTitle}>{productDetails.name}</h6>
                </div>
                <Button aria-label='button' onClick={handleClose} className={styles.quickviewCloseButton}>
                    <svg height='45' width='45' fill='inherit' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                        <path fill='inherit' d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
                        <path fill="white" d="M184 840h656V184H184v656zm163.9-473.9A7.95 7.95 0 0 1 354 353h58.9c4.7 0 9.2 2.1 12.3 5.7L512 462.2l86.8-103.5c3-3.6 7.5-5.7 12.3-5.7H670c6.8 0 10.5 7.9 6.1 13.1L553.8 512l122.3 145.9c4.4 5.2.7 13.1-6.1 13.1h-58.9c-4.7 0-9.2-2.1-12.3-5.7L512 561.8l-86.8 103.5c-3 3.6-7.5 5.7-12.3 5.7H354c-6.8 0-10.5-7.9-6.1-13.1L470.2 512 347.9 366.1z" />
                        <path fill='inherit' d="M354 671h58.9c4.8 0 9.3-2.1 12.3-5.7L512 561.8l86.8 103.5c3.1 3.6 7.6 5.7 12.3 5.7H670c6.8 0 10.5-7.9 6.1-13.1L553.8 512l122.3-145.9c4.4-5.2.7-13.1-6.1-13.1h-58.9c-4.8 0-9.3 2.1-12.3 5.7L512 462.2l-86.8-103.5c-3.1-3.6-7.6-5.7-12.3-5.7H354c-6.8 0-10.5 7.9-6.1 13.1L470.2 512 347.9 657.9A7.95 7.95 0 0 0 354 671z" />
                    </svg>
                </Button>
            </Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100', }}>
                <Tabs
                    textColor="secondary"
                    variant='fullWidth'
                    indicatorColor="secondary"
                    value={selectedTab}
                    onChange={handleChangeTab}
                    aria-label="Product details tabs"
                >
                    <Tab tabIndex={0} label="Details" />
                    <Tab tabIndex={1} label="Related" />
                    <Tab tabIndex={3} label="Specs" />
                </Tabs>
            </Box>
            {/* Content for each tab */}
            <Box height='260px'>

                <TabPanel value={selectedTab} index={0}>
                    <Box sx={{
                        position: 'relative',
                        overflow: 'hidden', // Prevent overflow to show the fade effect correctly
                        height: '200px',
                        border: 0.1,
                        p: 2,
                        pb: 0,
                        boxShadow: '1px 4px 6px -1px rgba(0, 0, 0, 0.2)',
                    }}>
                        {/* Scrollable content */}
                        <div style={{
                            overflowY: 'auto',
                            height: '100%',
                            paddingBottom: 20
                        }}>
                            <p className={styles.quickviewDescription}>
                                {productDetails.description}
                            </p>
                        </div>

                        {/* Fade Effect Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '40px', // Adjust the height based on the desired fade effect size
                            backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
                        }}></div>
                    </Box>
                </TabPanel>

                <TabPanel value={selectedTab} index={1}>
                    {relatedProducts.map((product) => (
                        <Box onClick={() => setProductDetails(product)} className={styles.quickviewRelatedContainer} key={product._id}> {/* Use `_id` or appropriate key property */}
                            <img className={styles.quickviewRelatedImg} alt='related' src={product.imgSource[0].url} />
                            <Box component='button'>
                                <Box className={styles.quickviewRelatedName}>{product.name}</Box>
                            </Box>
                        </Box>
                    ))}
                </TabPanel>
                <TabPanel className="text-xl ml-4 pt-4" value={selectedTab} index={2}>{productDetails.specs}</TabPanel>
            </Box >
            <Box className={styles.quickviewPrice}>${productDetails.price}</Box>
            {/* Quantity Selector */}
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexDirection: { xs: 'column', sm: 'row' }, width: '100%' }}>
                <FormControl sx={{ width: '50%', mb: 2 }}>
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
                        {Array.from(Array(10).keys()).map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                                {x + 1}
                            </MenuItem>
                        ))}

                    </Select>
                </FormControl>
                {/* Flavor Selector */}
                <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="flavor-label">Flavor</InputLabel>
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
                    className="w-full border-gray-600 bg-primary text-on-primary s text-sm uppercase rounded-none h-14 transition-all duration-300 ease-in-out hover:bg-secondary hover:text-white hover:border-secondary hover:scale-105"
                    onClick={() => addToCart(productDetails, quantity)}
                >
                    Add to Cart
                </Button>
            </Box>
        </>
    );
};

export default ProductDetails;