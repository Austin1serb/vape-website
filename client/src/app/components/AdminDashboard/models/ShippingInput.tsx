// ShippingInput.js

import React from 'react';
import { FormControl, FormLabel, Box, TextField } from '@mui/material';


interface ShippingInputProps {
    weight: number|string;
    length: number|string;
    width: number|string;
    height: number|string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ShippingInput: React.FC<ShippingInputProps> = ({ weight, length, width, height, handleChange }) => {
    return (
        <FormControl

            sx={{
                width: '100%',
                pl: 1,
                py: 1,
                pr: 1,
                border: 1,
                borderRadius: 1,
                
            }}
            component="fieldset"
            className='border-gray-500'
        >
            <FormLabel
                className="form-label-sx"
                sx={{
                    fontSize: 16,
                    color:'var(--color-blue)'
                }}
                component="legend">Shipping Details (Optional).</FormLabel>
            <Box sx={{
                display: 'flex', alignItems: 'center', flexDirection: {
                    sm: 'row',
                    xs: 'column',
                },
            }} >
                <TextField
                    sx={{ my: 2 }}
                    name="shipping.weight"
                    label="Weight (oz)"
                    type="number"
                    fullWidth
                    value={weight}
                    onChange={handleChange}
                    onWheel={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                            e.target.blur();
                        }
                    }}
                />
                <TextField
                    sx={{ my: 2 }}
                    name="shipping.dimensions.length"
                    label="Length (in)"
                    type="number"
                    fullWidth
                    value={length}
                    onChange={handleChange}
                    onWheel={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                            e.target.blur();
                        }
                    }}
                />
                <TextField
                    sx={{ my: 2 }}
                    name="shipping.dimensions.width"
                    label="Width (in)"
                    type="number"
                    fullWidth
                    value={width}
                    onChange={handleChange}
                    onWheel={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                            e.target.blur();
                        }
                    }}
                />
                <TextField
                    sx={{ my: 2 }}
                    name="shipping.dimensions.height"
                    label="Height (in)"
                    type="number"
                    fullWidth
                    value={height}
                    onChange={handleChange}
                    onWheel={(e) => {
                        if (e.target instanceof HTMLInputElement) {
                            e.target.blur();
                        }
                    }}
                />
            </Box>
        </FormControl>
    );
}

export default ShippingInput;
