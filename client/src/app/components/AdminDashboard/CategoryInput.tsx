import React from 'react';
import { InputLabel, MenuItem, FormControl, Select, Chip, Box, SelectChangeEvent, Theme, FilledInput, Checkbox, ListItemText, FormHelperText } from '@mui/material';
import { Category, CategoryItem } from '../types';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
interface CategoryInputProps {
    category: string[];
    onAddCategory: (category: string[]) => void;
    allCategories: Category[];
    error?: string | null;
}
const CategoryInput: React.FC<CategoryInputProps> = ({ category, onAddCategory, error, allCategories }) => {

    //useEffect to console.log category
    React.useEffect(() => {
        console.log(category);
    }
        , [category]);

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
            target: { value },
        } = event;
        const categoryIds = typeof value === 'string' ? value.split(',') : value;
        onAddCategory(categoryIds);
    };

    return (
        <div>
            <FormControl fullWidth error={Boolean(error)}>
                <InputLabel id="multiple-chip-label">Categories</InputLabel>
                <Select
                    labelId="multiple-chip-label"
                    id="multiple-chip"
                    multiple
                    variant='filled'
                    value={category}
                    color='secondary'
                    onChange={handleChange}
                    input={<FilledInput id="select-multiple-chip" />}
                    renderValue={(selectedIds) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selectedIds.map((id) => {
                                const category = allCategories.find(c => c._id === id);
                                return <Chip color='secondary' key={id} label={category ? category.name : ''} />;
                            })}
                        </Box>
                    )}

                    MenuProps={MenuProps}
                >
                    {allCategories.map((categoryOption:Category) => (
                        <MenuItem
                            key={categoryOption._id}
                            value={categoryOption._id} // Use `_id` as the value
                        >
                            <Checkbox
                                color='success'
                                checked={category.includes(categoryOption._id!)} // Check against IDs
                            />
                            <ListItemText primary={categoryOption.name} />
                        </MenuItem>
                    ))}

                </Select>
                {error && <FormHelperText color="error" >{error}</FormHelperText>}
            </FormControl>
        </div>
    );
};

export default CategoryInput;
