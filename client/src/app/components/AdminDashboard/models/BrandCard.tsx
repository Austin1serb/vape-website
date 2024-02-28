// components/BrandCard.tsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Brand } from '@/components/types';

interface BrandCardProps {
    brand: Brand;
}
const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            {brand.imgSource.length > 0 && (
                <CardMedia
                    component="img"
                    height="140"
                    image={brand.imgSource[0].url}
                    alt={brand.name}
                />
            )}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {brand.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {brand.description}
                </Typography>
                <Box display="flex" alignItems="center" mt={2}>
                    <StarBorderIcon color="action" />
                    <Typography variant="subtitle2" ml={1}>
                        {brand.rating} / 5
                    </Typography>
                </Box>
                <Box mt={2}>
                    {brand.tags.map((tag, index) => (
                        <Chip key={index} label={tag} variant="outlined" size="small" sx={{ mr: 0.5 }} />
                    ))}
                </Box>
            </CardContent>
        </Card>
    );
};

export default BrandCard;
