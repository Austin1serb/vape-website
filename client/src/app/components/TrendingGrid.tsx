// ProductsGrid.tsx
import React from 'react';
import ProductCard from './ProductCard';

const products = [
    { id: 1, name: 'MTRX 12000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/g/e/geek_vape_-_t200_aegis_touch_-_kits_-_all_colors.png', price: 99.99, reviews: 4 },
    { id: 2, name: 'Innokin Klypse Pod System', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/o/x/oxbar_magic_maze_pro_10000_disposable_-_pod_juice_default.png', price: 89.99, reviews: 5 },
    { id: 3, name: 'Lost Mary MT15000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/p/a/pax_labs_pax_plus_-_all_colors.png', price: 79.99, reviews: 3 },
];

const TrendingGrid: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto p-4 bg-gray-100">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default TrendingGrid;
