import React from 'react';
import { DialogContentText, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import { Brand } from '@/components/types';

interface BrandFormProps {
    brandData: Brand;
    error: ErrorState;
    handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleIsActiveChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface ErrorState {
    [key: string]: string; // Assumes error state is a map of field names to error messages
}

export const BrandForm: React.FC<BrandFormProps> = ({ brandData, error, handleChange, handleIsActiveChange }) => {
    return (
        <>
            {/* is active mui button */}
            <div className='w-full border border-gray-500 rounded-lg flex items-center justify-between p-4 my-4 bg-gray-800 max-h-16'>
                <div>
                    <Typography variant="subtitle1" component="h2" color="white" sx={{ backgroundColor: 'var(--color-dark-surface)', width: 'fit-content', borderRadius: 1, px: 1, color: 'var(--color-blue)' }} className='-translate-y-6 '>
                        Brand Status:

                        <Typography variant="button" color={brandData.isActive ? "#7BFF00" : 'error'}>
                            {brandData.isActive ? " Active" : " Inactive"}
                        </Typography>
                    </Typography>
                    <Typography variant='body2' color="gray">
                        Toggle to {brandData.isActive ? 'deactivate' : 'activate'} the brand on your website.
                    </Typography>
                </div>
                <div className="flex items-center gap-2">
                    <Switch
                        checked={brandData.isActive}
                        onChange={handleIsActiveChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color='secondary'
                    />
                </div>
            </div>
            {/* brand name */}


            <TextField
                sx={{ my: 2 }}
                error={error.name ? true : false}
                helperText={error.name}
                required
                label="Brand Name"
                name="name"
                value={brandData.name}
                onChange={handleChange}
                autoComplete='true'
                autoCorrect='true'
                fullWidth
            />
            {/* description */}

            <TextField
                sx={{ my: 2}}

                multiline
                rows={4}
                error={error.description ? true : false}
                helperText={error.description}
                required
                label="Description"
                name="description"
                value={brandData.description}
                onChange={handleChange}
                autoComplete='true'
                autoCorrect='true'
                fullWidth
            />



        </>
    )
}
export default BrandForm