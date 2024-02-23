import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { ProductOrdered } from '@/components/types';
import Image from 'next/image';


interface AdminProductCard {
    product: ProductOrdered;
}

const AdminProductCard: React.FC<AdminProductCard> = ({ product }) => {
    return (
        <div className="w-full flex flex-row bg-[var(--color-dark-surface)] rounded">
            <div className="flex-none w-24 h-24 bg-gray-200 overflow-hidden relative rounded-l">
                <Image fill sizes='10vw' quality={30} src={product.img} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow p-4">
                <div className="flex flex-col justify-between h-full">
                    <Typography variant="body2" >Product: {product.name}</Typography>
                    <Typography variant="body2" >Quantity: {product.quantity}</Typography>
                    <Typography variant="body2" >Price: ${product.price.toFixed(2)}</Typography>
                </div>
            </div>
        </div>
    );
};

export default AdminProductCard;
