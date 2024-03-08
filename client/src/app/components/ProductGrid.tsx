// ProductsGrid.tsx
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from './types';

interface Props {
    products: Product[]
    sm: boolean;
}
const TrendingGrid: React.FC<Props> = ({ products, sm }) => {
    return (
        <div className="grid grid-cols-3  gap-2">
            {products.slice(0, 3).map(product => (
                <ProductCard key={product._id} product={product} sm={false} />
            ))}
        </div>

    );
};

export default TrendingGrid;
