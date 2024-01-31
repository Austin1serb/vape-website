// ProductCard.tsx
import React from 'react';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
      <button className="absolute inset-0 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300 bg-black bg-opacity-50 text-white">
        Quick View
      </button>
      <div className="pt-2">
        <p className="text-sm font-semibold">{product.name}</p>
        <p className="text-sm">${product.price}</p>
        <p className="text-sm">Reviews: {product.reviews}</p>
      </div>
    </div>
  );
};

export default ProductCard;
