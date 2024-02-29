import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    FormControl,
    FormLabel,
    Chip,
    Typography,
} from '@mui/material';
import { BorderColor } from '@mui/icons-material';


interface KeywordsInputProps {
    Keywords: string[];
    onAddKeyword: (keyword: string) => void;
    onRemoveKeyword: (keyword: string) => void;
    error?: string | null;
}

const KeywordsInput: React.FC<KeywordsInputProps> = ({ Keywords, onAddKeyword, onRemoveKeyword, error }) => {
    const [newKeyword, setNewKeyword] = useState<string>('');
    const [localError, setLocalError] = useState(error);

    const handleAddKeyword = () => {
        if (newKeyword.trim() !== '') {
            const formattedKeyword = newKeyword.trim().toLowerCase();
            if (!Keywords.includes(formattedKeyword)) {
                onAddKeyword(formattedKeyword);
                setLocalError(null);
            } else {
            setLocalError('Category already exists');
        }

        setNewKeyword('');
    }else {
        setLocalError('Category name cannot be empty');
    }
};
const handleKeyPress = (event: { key: string; preventDefault: () => void; }) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action to avoid form submission or any other unintended behavior
        handleAddKeyword();
    }
}

//useEffect(() => {
//    // Update the local error state when the error prop changes
//    setLocalError(error);
//}, [error]);

return (
    <FormControl
        sx={{
            width: '97%',
            pl: 1,
            py: 1,
            pr: 1,
            border: 1,
            borderRadius: 1,
            BorderColor: 'gray',
        }}
        component="fieldset"
        className='border-gray-500'
    >
        <FormLabel
            className="form-label-sx1"
            sx={{
                fontSize: 16,
                color: 'var(--color-blue)',
                BorderColor: 'gray',
            }}
            component="legend">Add  keywords.</FormLabel>
        <Box sx={{ display: 'flex', alignItems: 'center',ml:2 }}>
            <TextField
                spellCheck={true}
                autoCorrect='true'
                autoComplete='true'
                label="Keywords"
                name='keywords'
                value={newKeyword}
                variant='filled'
                color='secondary'
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={handleKeyPress}
                helperText={localError}
                error={!!localError}

            />
            <Button
                sx={{ fontSize: 10, m: 2 }}
                variant="outlined"
                color="primary"
                onClick={handleAddKeyword}
            >
                Add
            </Button>
        </Box>
        <Box>
            {Keywords.map((Keyword, index: number) => (
                <Chip
                    sx={{
                        m: 1,
                        '&:hover': {
                            borderColor: 'var(--color-secondary)',
                            transition:'all 0.2s'
                        },
                    }}
                    size="small"
                    key={index}
                    label={Keyword}
                    onDelete={() => onRemoveKeyword(Keyword)}
                    color="primary"
                    variant="outlined"
                />
            ))}
        </Box>
    </FormControl>
);
};

export default KeywordsInput;
