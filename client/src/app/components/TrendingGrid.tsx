// ProductsGrid.tsx
import React from 'react';
import ProductCard from './ProductCard';

interface PropData{
    id: number;
    name:string;
    imageUrl:string;
    reviews:number;
    price:number;
}
interface Props{
    products:PropData[]
}
const TrendingGrid: React.FC<Props> = ({products}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto p-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} sm={false} />
            ))}
        </div>
    );
};

export default TrendingGrid;
