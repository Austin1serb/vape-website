import React, { useState, useEffect } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import AddProductModal from './models/AddProductModal';
import { DataGrid, GridColDef, GridToolbar, GridValueFormatterParams } from '@mui/x-data-grid';
import DetailsView from './DetailsView';
import Image from 'next/image';
import { Product } from '../types';

const API_URL = 'http://localhost:8000/api/product/';

interface ErrorState {
    message: string;
}
const ProductList: React.FC = () => {
    const [detailsViewOpen, setDetailsViewOpen] = useState<boolean>(false);
    const [selectedProductForDetails, setSelectedProductForDetails] = useState<Product | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<ErrorState | null>(null);

    const formatDate = (dateString: string): string => {
        if (dateString) {
            const date = new Date(dateString);
            const options: Intl.DateTimeFormatOptions = {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        } else {
            return 'Date Not Found';
        }
    };





    useEffect(() => {
        // Fetch products from your backend API
        setIsLoading(true);

        fetch(API_URL, {
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleOpenAddProductModal = () => {
        setIsAddProductModalOpen(true);
    };

    const handleCloseAddProductModal = () => {
        setIsAddProductModalOpen(false);
    };
    const handleCloseEditProductModal = () => {
        setIsAddProductModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedProduct(null); // Reset selectedProduct when the edit modal is closed
    };

    const handleAddProduct = (newProduct: Product) => {
        // You can update the 'products' state with the new product data here
        setProducts([...products, newProduct]);
        handleCloseAddProductModal();
    };
    const handleEditProduct = (product: React.SetStateAction<Product | null>) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };
    const handleOpenDetailsView = (product: React.SetStateAction<Product | null>) => {
        setSelectedProductForDetails(product);
        setDetailsViewOpen(true);
    };







    const handleUpdateProduct = (updatedProduct: Product) => {
        setProducts((prevProducts) => {
            // Map through the previous products and replace the one with the matching _id
            return prevProducts.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
            );
        });
    };





    const handleDeleteProduct = (productId: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this product?');

        if (confirmDelete) {
            fetch(`http://localhost:8000/api/product/${productId}`, {
                credentials: 'include',
                method: 'DELETE',
            })
                .then((response) => {
                    if (response.ok) {
                        const updatedProducts = products.filter((product) => product._id !== productId);
                        setProducts(updatedProducts);
                    } else {
                        console.error('Error deleting product:', response.statusText);
                    }
                })
                .catch((error) => {
                    console.error('Error deleting product:', error);
                });
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'imgSource',
            headerName: 'Image',
            flex: 0.5,
            renderCell: (params) => (
                <div className='relative h-12 w-12'>
                <Image
                    src={params.value[0]?.url || '/default-product-image.jpg'} // Fallback to a default image if no URL
                    fill
                    alt="Product"
                    sizes='5vw'
                    quality={30}
                    className='rounded-sm bg-background object-contain'
                />
                </div>
            ),
        },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        { field: 'specs', headerName: 'Specs', flex: 1 },
        { field: 'totalSold', headerName: 'Sold', flex: 0.25 },
        {
            field: 'price',
            headerName: 'Price',
            flex: 0.5,
            valueFormatter: (params: GridValueFormatterParams) => `$${params.value.toFixed(2)}`
        },
        {
            field: 'createdAt',
            headerName: 'Date Added',
            flex: 0.75,
            valueFormatter: (params: GridValueFormatterParams) => formatDate(params.value as string),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1.75,
            sortable: false,
            
            renderCell: (params) => (
                <Box sx={{ ml: -1 }}>
                    <Button
                        sx={{ fontSize: 8, mr: 1 }}
                        variant="contained"
                        color="success"
                        onClick={() => handleOpenDetailsView(params.row)}
                    >
                        Details
                    </Button>
                    <Button
                        sx={{ fontSize: 8, mr: 1 }}
                        variant="contained"
                        color="primary"
                        onClick={() => handleEditProduct(params.row)}
                    >
                        Edit
                    </Button>
                    <Button
                        sx={{ fontSize: 8 }}
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteProduct(params.row._id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
        },
    ];


    return (
        
        <Box sx={{ p: 2, m: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 2 }} >
                <Typography variant="h6">Product Management</Typography>
                <Button variant="contained" color="success" onClick={handleOpenAddProductModal}>
                    Add Product
                </Button>
            </Box>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <DataGrid
                 
                    rows={products.map(product => ({
                        ...product,
                        createdAt: formatDate(product.createdAt!), // Format the date
                    }))}

                    //rows={products}
                    columns={columns}
                    autoHeight
                    disableRowSelectionOnClick
                    getRowId={(row) => row._id}
                    components={{ Toolbar: GridToolbar }}
                />
            )}
            <AddProductModal
                open={isAddProductModalOpen || isEditModalOpen}
                onClose={handleCloseEditProductModal}
                selectedProduct={selectedProduct}
                onAddProduct={handleAddProduct} // For adding a product
                onUpdateProduct={handleUpdateProduct} // For updating a product

            />

            {/* Render the DetailsView component when detailsViewOpen is true */}
            {detailsViewOpen && (
                <DetailsView
                    open={detailsViewOpen}
                    product={selectedProductForDetails!}
                    onClose={() => setDetailsViewOpen(false)}
                />
            )}


        </Box>
    );
};

export default ProductList;


