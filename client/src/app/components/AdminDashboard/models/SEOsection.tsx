// SEOSection.js

import React from 'react';
import { FormControl, FormLabel, Box, TextField } from '@mui/material';
import SeoKeywordsInput from '../SeoKeywordsInput'; 
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
                width: '97%',
                my: 2,
                pl: 1,
                py: 1,
                pr: 1,
                border: .5,
                borderRadius: 1,
                
            }}
            component="fieldset"
            className='border-gray-500'
        >
            <FormLabel
                className='form-label-sx text-blue-500'
                component="legend">   Search Engine Optimization (Optional)</FormLabel>
            <Box sx={{}} >
                {/*<Typography variant="body2" sx={{ mt: 2, ml: '25%' }}>
                            Search Engine Optimization (Optional)
                        </Typography>*/}

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
                    rows={2}
                    value={productData.seo['description']}
                    onChange={handleChange}
                />

                {/* SEO Keywords Input Component */}
                <SeoKeywordsInput
                    seoKeywords={productData.seoKeywords}
                    onAddKeyword={handleAddKeyword}
                    onRemoveKeyword={handleRemoveKeyword}
                />

            </Box>
        </FormControl>
    );
}

export default SEOSection;
