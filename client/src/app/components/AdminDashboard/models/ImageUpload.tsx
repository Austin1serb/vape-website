// ImageUpload.js

import React, { CSSProperties } from 'react';
import {
    FormControl, FormLabel, Box, Button,
    Typography, CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import BrandImage from '@/components/BrandImage';

interface ImageUploadProps {
    error: { [key: string]: string };
    setError?: (newError: { [key: string]: string }) => void;
    loading: boolean;
    selectedImage?: File[];
    selectedImageData: string[]; // Array of image URLs
    handleImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setSelectedImageData: (newImageData: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    error,
    setError,
    loading,
    selectedImage,
    selectedImageData,
    handleImage,
    setSelectedImageData
}) => {

    const handleRemoveImage = (indexToRemove: number): void => {
        const newImages = selectedImageData.filter((_, index) => index !== indexToRemove);
        setSelectedImageData(newImages);
    };


    const imageContainerStyles: CSSProperties = {
        height: '100px',
        width: '100px',
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '5px',
        border: '1px solid gray',
        backgroundColor: 'white',
        borderRadius: '10px',
    };

    // Styles for the image thumbnail container
    const thumbnailContainerStyles = {
        display: 'flex',
        overflowX: 'auto', // Adds horizontal scroll if content exceeds container width
        gap: '10px', // Spacing between image containers
    };
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    return (
        <FormControl
            sx={{
                width: '100%',
                fontSize: 8,
                my: 2,
                pl: 1,
                py: 1,
                pr: 1,
                border: 1,
                borderRadius: 1,
                borderColor: error.imgSource ? 'red' : '#686D6E',


            }}
            component="fieldset"

        >
            <FormLabel component="legend"
                htmlFor='image-upload'
                sx={{
                    fontSize: 16,
                    pr: 0.5,
                    pl: .5,
                    // Apply MUI error color to title when there is an error
                    color: error['imgSource'] ? theme => theme.palette.error.main : 'var(--color-blue)',
                }}
                className='form-label-sx text-blue-500'
            > Upload an image*</FormLabel>


            <Box>
                <label htmlFor="image-upload"> {/* This label acts as the button */}
                    <Button
                        variant="outlined"
                        component="span"
                        startIcon={<CloudUploadIcon />}
                        disabled={loading || (selectedImageData && selectedImageData.length >= 5)}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Add image'}
                    </Button>
                </label>
                <VisuallyHiddenInput
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    multiple
                    onChange={handleImage}
                />
                {/* Displaying max limit message */}
                {(selectedImageData && selectedImageData.length >= 5) &&
                    <Typography variant='caption' sx={{ ml: 1.2 }} color="textSecondary">
                        Max 5 photos
                    </Typography>
                }
                {selectedImage ? (
                    <Typography variant="body2" color="textSecondary">
                        Selected image(s): {selectedImage[0]?.name}
                    </Typography>
                ) : (
                    <Box>
                        <Typography variant="body2" color="textSecondary">Uploaded Image(s)</Typography>
                    </Box>
                )}

                {error['imgSource'] && (
                    <Typography variant='caption' sx={{ ml: 1.2 }} color="error">
                        {error['imgSource']}
                    </Typography>
                )}
                <Box sx={thumbnailContainerStyles}>
                    {selectedImageData && selectedImageData.length > 0 ? (
                        selectedImageData.map((imgUrl, index) => (
                            <div key={index + 'div'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                                <div key={index} style={imageContainerStyles}>
                                    <BrandImage
                                        src={imgUrl}
                                        alt={`Selected Thumbnail ${index + 1}`}
                                        height={100}
                                        width={100}
                                        className='rounded-lg border-red-100 border'
                                    />

                                </div>
                                <Button
                                    key={index + 'button'}
                                    color='warning'
                                    size="small"
                                    variant="text"
                                    onClick={() => handleRemoveImage(index)}
                                    sx={{ marginTop: '5px' }}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))
                    ) : (
                        <Typography sx={{ m: 1 }} variant='caption' color="textSecondary">
                            Preview will appear here after selecting an image.
                        </Typography>
                    )}
                </Box>


            </Box>
        </FormControl>

    );
}

export default ImageUpload;
