import React from 'react';
import Icon from './Icon';
import Link from 'next/link';
import Image from 'next/image';

interface ProductItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  reviews: number; // Assuming this is the review score, not the number of reviews
}

interface ProductCardProps {
  product: ProductItem;
  sm?: boolean;
}

const renderStars = (score: number) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= score) {
      // Full star
      stars.push(<Icon name={'FullStar'} height={15} width={15} key={i} className="rating-stars" />);
    } else if (i - 1 < score && i > score) {
      // Half star - adjust this logic if you have a way to represent half stars
      stars.push(<Icon name={'HalfStar'} height={15} width={15} key={i} className="rating-stars" />);
    } else {
      // Empty star
      stars.push(<Icon name={'EmptyStar'} height={15} width={15} key={i} className="rating-stars" />);
    }
  }
  return stars;
};

const ProductCard: React.FC<ProductCardProps> = ({ product, sm }) => {


  return (
    <div className=" flex flex-col justify-center items-center p-2">
      <div className='group relative w-full h-full flex flex-col justify-center items-center bg-white p-2'>
        {/*<div className="h-48 w-48 relative">
        <Image
          src={product.imageUrl}
          fill
          
          sizes="(max-width: 768px) 10vw, (max-width: 1020px) 10vw, 10vw"
          alt={product.name}
          className={` w-${sm ? '9/12' : 'full'} h-${sm ? '9/12' : 'full'} object-cover rounded hover:cursor-pointer`} />
</div>*/}
        <Image src={product.imageUrl} height={320} width={320} alt={product.name} className={` w-${sm ? '9/12' : 'full'} h-${sm ? '9/12' : 'full'} object-cover rounded hover:cursor-pointer`} />
        <button className="absolute opacity-0 group-hover:opacity-100 flex justify-center items-center transition-all duration-300 bg-primary-transparent border border-primary border-2 hover:bg-primary-variant bg-opacity-100 hover:bg-opacity-100 text-white p-4 uppercase font-normal text-sm rounded text-base hidden md:flex whitespace-nowrap" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          Quick View
        </button>
      </div>
      <div className="pt-2 max-h-20 min-h-20 flex flex-col items-center text-center  justify-between">
        {sm ? (<span className='text-sm font-semibold hover:text-primary-variant hover:underline transition duration-300'>{product.name}</span>) : (<Link href={`/products/${product.id}`}
          className="text-sm font-semibold hover:text-primary-variant hover:underline transition duration-300">
          {product.name}</Link>)}
        <p className="text-sm font-bold text-gray-700">${product.price}</p>
        <div className="text-sm flex flex-row justify-center items-center">
          {renderStars(product.reviews)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
