// StrengthFeaturedControl.js

import React from 'react';
import {
    Box, FormControl, FormLabel, RadioGroup,
    FormControlLabel, Radio, Typography
} from '@mui/material';
import { Product } from '@/components/types';

interface StrengthFeaturedControlProps {
    selectedStrength: string;
    handleStrengthChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    productData: Product;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: any;
}

const StrengthFeaturedControl: React.FC<StrengthFeaturedControlProps> = ({
    selectedStrength,
    handleStrengthChange,
    productData,
    handleChange,
    error
}) => {
    return (
        <Box sx={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: {
                sm: 'row',
                xs: 'column',
            },

        }}>
            <FormControl sx={{
                my: 4,
                pl: 1,
                pb: 1,
                border: 1,
                borderRadius: 1,
                borderColor: 'gray'
            }}
                component="fieldset"

            >
                <FormLabel
                    sx={{
                        fontSize: 16,
                        pr: 0.5,
                        pl: .5,
                        color:'var(--color-blue)'
                    }}
                    className='form-label-sx'
                    component="legend"
                >Strength</FormLabel>
                <RadioGroup
                    row
                    aria-label="strength"
                    name="strength"
                    value={selectedStrength}
                    onChange={handleStrengthChange}
                >
                    <FormControlLabel
                        value="low"
                        control={<Radio />}
                        label="Low"
                    />
                    <FormControlLabel
                        value="medium"
                        control={<Radio />}
                        label="Medium"
                    />
                    <FormControlLabel
                        value="high"
                        control={<Radio />}
                        label="High"
                    />
                </RadioGroup>
                {error && (
                    <Typography variant='caption' sx={{ ml: 1.2 }} color="error">
                        {error.strength}
                    </Typography>
                )}
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'end' }} >
                <FormControl
                    sx={{
                        pl: 1,
                        pr: 3,
                        pb: 1,
                        border: 1,
                        borderRadius: 1,
                        borderColor: 'gray'
                    }}
                    component="fieldset"

                >
                    <FormLabel sx={{
                        fontSize: 16,
                        pl: .5,
                        color:'var(--color-blue)'

                    }}
                        className='form-label-sx text-blue-500 ' component="legend">

                        Feature on Home page?</FormLabel>
                    <RadioGroup
                        color='success'
                        row
                        aria-label="isFeatured"
                        name="isFeatured"
                        value={Boolean(productData.isFeatured)} // Use the actual Boolean value
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value={Boolean(true)}
                            control={<Radio />}
                            label="Yes"
                            color='secondary'
                        />
                        <FormControlLabel
                            value={Boolean(false)}
                            control={<Radio />}
                            label="No"
                        />
                    </RadioGroup>
                    
                </FormControl>
            </Box>
        </Box>

    );
}

export default StrengthFeaturedControl;
