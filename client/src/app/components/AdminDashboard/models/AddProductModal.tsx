
import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    CircularProgress,
    Snackbar,
    Alert,
    SelectChangeEvent,

} from '@mui/material';
import CategoryInput from '../CategoryInput';
import ImageUpload from './ImageUpload';
import StrengthFeaturedControl from './StrengthFeaturedControl';
import SEOSection from './SEOsection';
import ShippingInput from './ShippingInput';
import { Product, Brand, Category, CategoryItem, BrandItem } from '@/components/types';
import { ProductForm } from './ProductForm';
import GPTResponseGenerator from '../GptResponseGenerator';

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
    brands: Brand[];
    categories: Category[];
}


const AddProductModal: React.FC<Props> = ({ open, onClose, onAddProduct, selectedProduct, onUpdateProduct, brands, categories }) => {
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
            let categoryIds: string[] = []
            if (typeof selectedProduct.category[0] === 'object') {
                categoryIds = selectedProduct.category.map(cat => (cat as CategoryItem)._id);
            }
            let brandName: string = '';
            if (typeof selectedProduct.brand === 'object') {
                brandName = (selectedProduct.brand as BrandItem).name;
            } else {
                brandName = selectedProduct.brand;
            }

            setProductData({
                ...selectedProduct,
                category: categoryIds,
                brand: brandName,
            });
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




    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = event.target;


        if (name === "brand") {
            // If the changed field is "brand", update the brand in productData
            setProductData(prevData => ({
                ...prevData,
                brand: value,
            }));
        }

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
        } else if (name === 'isFeatured') {
            // Convert the value to a boolean
            const isFeatured = value === 'true';
            setProductData({ ...productData, [name]: isFeatured });

        } else {
            setProductData({ ...productData, [name]: value });
        }

        setError((prevError) => {
            const updatedError = { ...prevError };
            // Example validation condition
            if (value.trim() === '') {
                updatedError[name] = 'This field cannot be empty.';
            } else {
                delete updatedError[name];
            }
            return updatedError;
        });
    };

    const API_URL = 'http://localhost:8000/api/product/';
    const HEADERS = {
        'Content-Type': 'application/json',
    };


    const handleAddProduct = async () => {

        try {
            setLoading(true);

            const productToUpdate = prepareProductData();
            console.log(productToUpdate)
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
    const handleAddCategory = (newCategory: string[]): void => {
        setProductData({
            ...productData,
            category: newCategory,
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
            border: error.errors ? '1px solid red' : '',
            width: '100%'
        },
    };

    const buttonOptions = selectedProduct ? 'Save Changes' : 'Add Product'




    const gptPrompt = `Generate a JSON object with detailed information for an e-cigarette product. Use the following structure:
    - "description": A concise description of the e-cigarette, highlighting its key features and benefits within 300 characters. Incorporate the brand "${productData.brand}" and product name "${productData.name}".
    - "seoTitle": A search engine optimized title that includes the brand and product name.
    - "seoDescription": A brief SEO-friendly description, focusing on main features and advantages, suitable for search
    engine snippets.
    - "seoKeywords": An array of relevant keywords, limited to 8 words, that are associated with the brand and product. These should be pertinent for improving search engine visibility. Ensure the generated content is coherent, engaging, and optimized for SEO purposes. The description should effectively communicate the product's unique selling points and how it stands out in the market.`;

    const parseGptResponse = (response: any) => {
        const {
            description,
            seoTitle,
            seoDescription,
            seoKeywords,
        } = response;


        const updatedProductData = {
            description,
            seo: {
                title: seoTitle,
                description: seoDescription,
            },
            seoKeywords,
        };

        console.log("Updated Product Data: ", updatedProductData);
        return updatedProductData;
    };




    const handleGPTResponse = (response: any) => {

        console.log(response);
        const parsedData = parseGptResponse(response);
        setProductData(currentData => ({
            ...currentData, // Keep existing non-SEO product data
            ...parsedData, // Update product data with parsed GPT response data
            seo: {
                ...currentData.seo, // Keep existing SEO data
                ...parsedData.seo // Overwrite SEO title and description with new ones from GPT
            },
            seoKeywords: parsedData.seoKeywords, // Update SEO keywords array
        }));
    };


    return (
        <>
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={5000} // Adjust the duration as needed
                onClose={() => setIsSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert severity="error" onClose={() => setIsSnackbarOpen(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Dialog open={open} PaperProps={paperProps} fullWidth>


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

                    <ProductForm
                        brands={brands}
                        productData={productData}
                        error={error}

                        handleChange={handleChange}
                    //handleSelectChange={handleSelectChange}
                    />
                    {/* Category Input Component */}
                    <CategoryInput
                        category={productData.category as string[]}
                        onAddCategory={handleAddCategory}
                        error={error && error.category}
                        allCategories={categories}
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
                <div className='bg-primary-variant flex justify-between py-2, p-4 shadow'>
                    <Button onClick={clearForm} variant='contained' color="secondary">
                        Clear Form
                    </Button>
                    <Button onClick={handleCancel} variant='contained' color="error">
                        Cancel
                    </Button>
                    <Button sx={{ minWidth: '142px', maxHeight: '36.5px' }} onClick={handleAddProduct} variant='contained' color="primary"
                        disabled={loading}
                    >
                        {loading ? <CircularProgress color='secondary' size={30} /> : buttonOptions}

                    </Button>

                    <GPTResponseGenerator
                        prompt={gptPrompt}
                        onResponse={handleGPTResponse}
                        data={productData}
                        error={error}
                        setError={setError}
                    />

                </div>

            </Dialog >
        </>
    )
};

export default AddProductModal;