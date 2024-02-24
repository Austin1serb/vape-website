
import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,

    CircularProgress,
    Snackbar,
    Alert,

} from '@mui/material';
import CategoryInput from '../CategoryInput';
import ImageUpload from './ImageUpload';
import StrengthFeaturedControl from './StrengthFeaturedControl';
import SEOSection from './SEOsection';
import ShippingInput from './ShippingInput';
import { Product } from '@/components/types';
import { ProductForm } from './ProductForm';

const initialProductData = {
    brand: '',
    name: '',
    price: 0.00,
    specs: '',
    totalSold: 0,
    imgSource: [],
    category: [],
    description: '',
    strength: 'low',
    isFeatured: false,
    flavor: '',
    seo: {
        title: '',
        description: '',
    },
    seoKeywords: [],
    shipping: {
        weight: 0,
        dimensions: {
            length: 0,
            width: 0,
            height: 0,
        },
    },
};

interface ErrorState {
    [key: string]: string; // Assumes error state is a map of field names to error messages
}

interface Props {
    open: boolean;
    onClose: () => void;
    onAddProduct: (productData: Product) => void;
    selectedProduct?: Product | null;
    onUpdateProduct: (productData: Product) => void;
}


const AddProductModal: React.FC<Props> = ({ open, onClose, onAddProduct, selectedProduct, onUpdateProduct, }) => {
    const [productData, setProductData] = useState<Product>(selectedProduct || initialProductData);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ErrorState>({});
    const [selectedImage, setSelectedImage] = useState<File[]>([]);
    const [selectedImageData, setSelectedImageData] = useState<string[]>([]);
    const [selectedStrength, setSelectedStrength] = useState<string>('low');
    const [isNewImageSelected, setIsNewImageSelected] = useState<boolean>(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');

    const openSnackbar = (errorData: ErrorState): void => {
        const firstError = Object.values(errorData)[0];
        setSnackbarMessage(firstError);
        setIsSnackbarOpen(true);
    };


    const handleStrengthChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
        const newStrength = event.target.value as 'low' | 'medium' | 'high'; // Assuming these are your valid strength values
        setSelectedStrength(newStrength);
        setProductData(prevData => ({ ...prevData, strength: newStrength }));
    };


    const handleAddKeyword = (newKeyword: string) => {
        setProductData({
            ...productData,
            seoKeywords: [...productData.seoKeywords, newKeyword],
        });
    };

    const handleRemoveKeyword = (keyword: string) => {
        const updatedKeywords = productData.seoKeywords?.filter((kw) => kw !== keyword);
        setProductData({
            ...productData,
            seoKeywords: updatedKeywords,
        });
    };


    const clearForm = () => {
        setProductData(initialProductData);
        setError({});
        setSelectedImage([]);
        setSelectedImageData([]);
        setSelectedStrength('low');
        setLoading(false)
    };


    useEffect(() => {
        setProductData((prevData) => ({
            ...prevData,
            imgSource: selectedImageData.map(urlOrObj => {
                if (typeof urlOrObj === 'string') {
                    const existingImageInfo = selectedProduct ? selectedProduct.imgSource.find(img => img.url === urlOrObj) : null;
                    return {
                        url: urlOrObj,
                        publicId: existingImageInfo ? existingImageInfo.publicId : undefined
                    };
                }
                return urlOrObj; // if it's already an object, just return as is
            }),
        }));
    }, [selectedImageData, selectedProduct]);




    useEffect(() => {
        if (selectedProduct) {
            setProductData(selectedProduct);
            setSelectedStrength(selectedProduct.strength!);

            // Check if selectedProduct has an image source
            if (selectedProduct.imgSource && selectedProduct.imgSource.length > 0) {
                setSelectedImageData(selectedProduct.imgSource.map(imageObj => imageObj.url));

            } else {
                setSelectedImageData([]);
            }


        } else {
            setProductData(initialProductData);
            setSelectedImageData([]);
        }
    }, [selectedProduct]);




    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        if (name.startsWith('seo.')) {
            const seoField = name.replace('seo.', ''); // Remove "seo." from the field name
            setProductData({
                ...productData,
                seo: {
                    ...productData.seo,
                    [seoField]: value,
                },
            });
        }
        else if (name.startsWith('shipping.')) {
            // Check if it's shipping.weight or shipping.dimensions properties
            if (name === 'shipping.weight') {
                setProductData({
                    ...productData,
                    shipping: {
                        ...productData.shipping,
                        weight: value,
                    },
                });
            } else if (name.startsWith('shipping.dimensions.')) {
                const dimensionProp = name.replace('shipping.dimensions.', '');
                setProductData({
                    ...productData,
                    shipping: {
                        ...productData.shipping,
                        dimensions: {
                            ...productData.shipping.dimensions,
                            [dimensionProp]: value,
                        },
                    },
                });
            }
        } else if (name === 'category') {
            const formattedCategory = value.toLowerCase().replace(/\s/g, '');
            setProductData(prevData => ({
                ...prevData,
                category: [...prevData.category, formattedCategory] // Adds the new formatted category to the array
            }));
        } else if (name === 'isFeatured') {
            // Convert the value to a boolean
            const isFeatured = value === 'true';
            setProductData({ ...productData, [name]: isFeatured });

        } else {
            setProductData({ ...productData, [name]: value });
        }
    };






    const API_URL = 'http://localhost:8000/api/product/';
    const HEADERS = {
        'Content-Type': 'application/json',
    };


    const handleAddProduct = async () => {
        try {
            setLoading(true);

            const productToUpdate = prepareProductData();

            const endpoint = selectedProduct ? `${API_URL}${selectedProduct._id}` : API_URL;
            const method = selectedProduct ? 'PUT' : 'POST';

            const response = await makeApiCall(endpoint, method, productToUpdate);

            await handleApiResponse(response);
        } catch (error) {
            console.error('Error adding/updating product:', error);
        } finally {
            setLoading(false);
        }
    };

    const prepareProductData = () => {
        const productDataCopy = { ...productData, strength: selectedStrength };

        const imageSource = selectedProduct ? formatImagesForUpdate() : formatImagesForNewProduct();
        productDataCopy.imgSource = imageSource || [];

        return productDataCopy;
    };

    const formatImagesForUpdate = () => {
        if (Array.isArray(selectedImageData) && selectedImageData.length) {
            return selectedImageData.map(url => {
                const existingImageInfo = selectedProduct?.imgSource.find(img => img.url === url);
                return {
                    url,
                    publicId: existingImageInfo ? existingImageInfo.publicId : undefined
                };
            });
        }
    };

    const formatImagesForNewProduct = () => {
        if (Array.isArray(selectedImageData) && selectedImageData.length) {
            return selectedImageData.map(url => ({ url }));
        }
    };

    const makeApiCall = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data?: object): Promise<Response> => {
        return fetch(url, {
            method,
            headers: HEADERS,
            credentials: 'include',
            body: JSON.stringify(data),
        });
    };

    const handleApiResponse = async (response: Response) => {
        if (response.ok) {
            const product = await response.json();
            if (selectedProduct) {
                onUpdateProduct(product);
            } else {
                onAddProduct(product);
            }
            clearForm();
            onClose();
        } else {
            const errorData = await response.json();

            setError(errorData);
            openSnackbar(errorData);
            console.error('API error:', errorData.message || errorData);
        }
    };



    // receive file from form
    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files); // Convert the FileList to an array
            files.forEach(file => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onloadend = () => {
                    // Ensure reader.result is a string before adding it
                    if (typeof reader.result === 'string') {
                        setSelectedImageData(prevImages => [...prevImages, reader.result as string]);
                    }
                };
            });
            setSelectedImage(files);

            setIsNewImageSelected(true);
        }
    };




    const handleCancel = () => {
        if (onClose) {
            onClose();
        }
        clearForm();
    }



    // Function to handle adding a new category
    const handleAddCategory = (newCategory: string): void => {
        setProductData({
            ...productData,
            category: [...productData.category, newCategory],
        });
    };

    // Function to handle removing a category
    const handleRemoveCategory = (category: string): void => {
        setProductData({
            ...productData,
            category: productData.category.filter((c) => c !== category),
        });
    };
    const { shipping } = productData;
    const weight = shipping?.weight || '';
    const dimensions = shipping?.dimensions || {};
    const length = dimensions.length || '';
    const width = dimensions.width || '';
    const height = dimensions.height || '';

    const paperProps = {
        style: {
            borderRadius: '5px',

            border: error.errors ? '1px solid red' : 'none'
        },
    };

    const buttonOptions = selectedProduct ? 'Save Changes' : 'Add Product'

    return (
        <>
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={4000} // Adjust the duration as needed
                onClose={() => setIsSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert severity="error" onClose={() => setIsSnackbarOpen(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Dialog open={open} PaperProps={paperProps}>


                <DialogTitle
                    className='bg-primary-variant text-center uppercase h-18'
                >{selectedProduct ? 'Edit Product Details' : 'Add New Product'}</DialogTitle>

                <DialogContent sx={{ borderRadius: 3 }} className='bg-dark-surface border-primary-variant border-4'>

                    <DialogContentText sx={{ my: 2 }} >
                        Please fill in the details of the new product.
                    </DialogContentText>

                    <DialogContentText variant='caption' sx={{ m: 2, color: '#D23030' }}>
                        Fields with * are required.
                    </DialogContentText>

                    {loading && <CircularProgress />}

                    <ProductForm productData={productData} error={error} handleChange={handleChange} />
                    {/* Category Input Component */}
                    <CategoryInput
                        category={productData.category}
                        onAddCategory={handleAddCategory}
                        onRemoveCategory={handleRemoveCategory}
                        error={error && error.category}
                    />

                    {/* Image Upload */}
                    <ImageUpload
                        error={error}
                        loading={loading}
                        selectedImage={selectedImage}
                        selectedImageData={selectedImageData}
                        handleImage={handleImage}
                        setSelectedImageData={setSelectedImageData}
                    />









                    {/* Strength and Featured */}
                    <StrengthFeaturedControl
                        selectedStrength={selectedStrength}
                        handleStrengthChange={handleStrengthChange}
                        productData={productData}
                        handleChange={handleChange}
                        error={error}
                    />



                    {/* SEO Section */}
                    <SEOSection
                        productData={productData}
                        handleChange={handleChange}
                        handleAddKeyword={handleAddKeyword}
                        handleRemoveKeyword={handleRemoveKeyword}
                    />

                    {/* SHIPPING INPUT */}
                    <ShippingInput
                        weight={weight as number}
                        length={length as number}
                        width={width as number}
                        height={height as number}
                        handleChange={handleChange}
                    />

                    {/* Add more fields as needed */}
                </DialogContent>
                <DialogActions className='bg-primary-variant flex justify-between py-2'>
                    <Button onClick={clearForm} variant='contained' color="secondary">
                        Clear Form
                    </Button>
                    <Button onClick={handleCancel} variant='contained' color="error">
                        Cancel
                    </Button>
                    <Button onClick={handleAddProduct} variant='contained' color="primary">
                        {loading ? <CircularProgress /> : buttonOptions}
                    </Button>
                </DialogActions>

            </Dialog >
        </>
    )
};

export default AddProductModal;