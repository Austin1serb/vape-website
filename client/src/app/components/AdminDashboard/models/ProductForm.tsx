import React from 'react';
import { TextField } from '@mui/material';
import { Product } from '@/components/types';

interface ProductFormProps {
    productData: Product;
    error: ErrorState;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}
interface ErrorState {
    [key: string]: string; // Assumes error state is a map of field names to error messages
}

export const ProductForm: React.FC<ProductFormProps> = ({ productData, error, handleChange }) => {
    return (
        <>
            {/* Brand */}
            <TextField
                sx={{ my: 2, }}
                name="brand"
                label="Brand*"
                fullWidth
                error={Boolean(error.brand)}
                helperText={error.brand}
                value={productData.brand}
                onChange={handleChange}
                autoComplete='true'
            />

            {/* Name */}
            <TextField
                sx={{ my: 2 }}
                name="name"
                label="Name*"
                fullWidth
                error={Boolean(error.name)}
                helperText={error.name}
                value={productData.name}
                onChange={handleChange}
                autoComplete='true'
            />

            {/* Price */}
            <TextField
                sx={{ my: 2 }}
                name="price"
                label="Price*"
                type="number"
                fullWidth
                error={Boolean(error.price)}
                helperText={error.price}
                value={productData.price}
                onChange={handleChange}
                autoComplete='false'
                onWheel={(e) => {
                    if (e.target instanceof HTMLInputElement) {
                        e.target.blur();
                    }
                }}
            />
            {/* Specs */}
            <TextField
                sx={{ my: 2 }}
                name="specs"
                label="Specs*"
                fullWidth
                error={Boolean(error.specs)}
                helperText={error.specs}
                value={productData.specs}
                onChange={handleChange}
                autoComplete='true'
            />

            {/* Description */}
            <TextField
                sx={{ my: 2 }}
                name="description"
                label="Description*"
                multiline
                rows={4}
                fullWidth
                error={Boolean(error.description)}
                helperText={error.description}
                value={productData.description}
                onChange={handleChange}
                autoComplete='true'
            />
            {/* Flavor */}
            <TextField
                sx={{ my: 2 }}
                name="flavor"
                label="Flavor"
                multiline
                rows={1}
                fullWidth
                value={productData.flavor}
                onChange={handleChange}
                spellCheck={true}
                autoComplete='true'
            />
            <TextField
                sx={{ my: 2 }}
                name="totalSold"
                label="Units Sold"
                multiline
                rows={1}
                fullWidth
                value={productData.totalSold}
                onChange={handleChange}
                autoComplete='true'
            />


        </>
    );
};
