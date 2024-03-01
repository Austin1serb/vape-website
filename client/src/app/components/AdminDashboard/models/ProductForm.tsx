import React from 'react';
import { FormControl, FormHelperText, InputLabel, MenuItem, MenuList, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Brand, Product } from '@/components/types';

import Image from 'next/image';

interface ProductFormProps {
    productData: Product;
    error: ErrorState;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>|SelectChangeEvent) => void;
    brands: Brand[];
}
interface ErrorState {
    [key: string]: string; // Assumes error state is a map of field names to error messages
}



export const ProductForm: React.FC<ProductFormProps> = ({ productData, error, handleChange, brands }) => {
    //state to hold selected brand
    const [selectedBrand, setSelectedBrand] = React.useState<Brand | null>(null);

    const handleSelectChange = (event: SelectChangeEvent) => {
        handleChange(event)
        const brandName = event.target.value;
        const brand = brands.find(b => b.name === brandName);
        setSelectedBrand(brand || null);

    };

    


    return (
        <>
            {/* Brand */}
            <FormControl fullWidth sx={{ my: 2 }} error={Boolean(error.brand)}>
                <InputLabel id="brand-select-label">Brand*</InputLabel>
                <Select
                    labelId="brand-select-label"
                    id="brand-select"
                    fullWidth
                    name="brand"
                    value={productData.brand}
                    label="Brand*"

                    onChange={handleSelectChange} // Assuming this updates both the selected brand and image
                    renderValue={(selected) => (
                        selectedBrand && <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} >
                            <div>{selected}</div>
                            <div style={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                backgroundColor: 'white'
                            }}>
                                <Image
                                    alt={selectedBrand.name}
                                    src={selectedBrand.imgSource[0].url}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    quality={50}
                                    sizes='5vw'
                                />
                            </div>
                        </div>
                    )}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 200,
                                overflow: 'auto',
                            },
                        },
                    }}
                >

                    {brands.map((brand) => (
                        <MenuItem key={brand._id} value={brand.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }} >
                            <div>{brand.name}</div>
                            <div style={{
                                width: '35px',
                                height: '35px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'relative',
                                backgroundColor: 'white'
                            }}>
                                <Image
                                    alt={brand.name}
                                    src={brand.imgSource[0].url}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    quality={50}
                                    sizes='5vw'
                                />
                            </div>
                        </MenuItem>

                    ))}
                </Select>
                {error.brand && <FormHelperText>{error.brand}</FormHelperText>}
            </FormControl>

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
