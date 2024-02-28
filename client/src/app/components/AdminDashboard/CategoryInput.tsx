import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    FormControl,
    FormLabel,
    Chip,
    Typography,
} from '@mui/material';

interface CategoryInputProps {
    category: string[];
    onAddCategory: (category: string) => void;
    onRemoveCategory: (category: string) => void;
    error?: string | null;
}
const CategoryInput: React.FC<CategoryInputProps> = ({ category, onAddCategory, onRemoveCategory, error }) => {
    const [newCategory, setNewCategory] = useState('');
    const [localError, setLocalError] = useState(error);

    const handleAddCategory = () => {
        if (newCategory.trim() !== '') {
            // Convert the new category to lowercase and remove leading/trailing spaces
            const formattedCategory = newCategory.trim().toLowerCase();

            // Check if the category already exists in the list
            if (!category.includes(formattedCategory)) {
                onAddCategory(formattedCategory);
                setLocalError(null); // Clear the local error state when a new category is successfully added
            } else {
                setLocalError('Category already exists');
            }

            setNewCategory('');
        } else {
            setLocalError('Category name cannot be empty');
        }
    };

    useEffect(() => {
        // Update the local error state when the error prop changes
        setLocalError(error);
    }, [error]);

    return (
        <FormControl
            className='transition-all duration-300 border-gray-500'
            sx={{

                width: '97%',
                pl: 1,
                py: 1,
                pr: 1,
                border: 1,
                borderRadius: 1,
                color: 'gray',
                borderColor: localError ? (theme) => theme.palette.error.main : '#686D6E',
            }}
            name='category-input'
            component="fieldset"
            variant="outlined"
        >
            <FormLabel
                id="category-input"
                component="legend"
                className="form-label-sx text-blue-500"
                sx={{
                    fontSize: 16,
                    color: 'var(--color-blue)'
                }}
            >
                Add product categories.*
            </FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
                <TextField
                    variant='filled'
                    color='secondary'
                    name='categories'
                    spellCheck={true}
                    autoCorrect='false'
                    label="Categories*"
                    value={newCategory}
                    error={Boolean(localError)}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button
                    sx={{ fontSize: 10, m: 2 }}
                    variant="outlined"
                    color={localError ? 'error' : 'primary'}
                    onClick={handleAddCategory}
                >
                    Add
                </Button>
            </Box>
            <Box>
                {category.map((category, index) => (
                    <Chip
                        sx={{
                            m: 1,
                            '&:hover': {
                                borderColor: 'red',
                            },
                        }}
                        size="small"
                        key={index}
                        label={category}
                        onDelete={() => onRemoveCategory(category)}
                        color="primary"
                        variant="outlined"
                    />
                ))}
                <Typography variant="caption" color="error">
                    {localError}
                </Typography>
            </Box>
        </FormControl>
    );
};

export default CategoryInput;
