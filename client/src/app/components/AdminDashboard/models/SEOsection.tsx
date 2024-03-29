// SEOSection.js

import React from 'react';
import { FormControl, FormLabel, Box, TextField } from '@mui/material';
import KeywordsInput from '../KeywordsInput'; 
import { Product } from '@/components/types';


interface SEOsectionProps {
    productData: Product;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddKeyword: (keyword: string) => void;
    handleRemoveKeyword: (keyword: string) => void;
}


const SEOSection:React.FC<SEOsectionProps>= ({ productData, handleChange, handleAddKeyword, handleRemoveKeyword }) => {
    return (
        <FormControl
        color='secondary'
            sx={{
                width: '100%',
                my: 2,
                pl: 1,
                py: 1,
                pr: 1,
                border: .5,
                borderRadius: 1,
                borderColor:'gray'
                
            }}
            component="fieldset"
         
        >
            <FormLabel
            sx={{
                color:'var(--color-blue)'
            }}
                className='form-label-sx'
                component="legend">   Search Engine Optimization (Optional)</FormLabel>
            <Box  >
                <TextField
                    sx={{ my: 2 }}
                    name="seo.title"
                    label="SEO Title"
                    fullWidth
                    value={productData.seo['title'] ? productData.seo['title'] : ''}

                    onChange={handleChange}
                />
                <TextField
                    sx={{ my: 2 }}
                    name="seo.description"
                    label="SEO Description"
                    fullWidth
                    multiline
                    value={productData.seo['description']}
                    onChange={handleChange}
                />

                {/* SEO Keywords Input Component */}
                <KeywordsInput
                    Keywords={productData.seoKeywords}
                    onAddKeyword={handleAddKeyword}
                    onRemoveKeyword={handleRemoveKeyword}
                />

            </Box>
        </FormControl>
    );
}

export default SEOSection;
