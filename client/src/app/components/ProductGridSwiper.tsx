import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import ProductCard from './ProductCard';
import Icon from './Icon';
import Link from 'next/link';

interface PropData {
    id: number;
    name: string;
    imageUrl: string;
    reviews: number;
    price: number;
    link:string;
}

interface Props {
    products: PropData[];
}

const ProductGridSwiper: React.FC<Props> = ({ products }) => {
    return (
        <div className="mx-auto p-4 relative"> {/* Make sure this div is positioned relatively */}
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="my-4"
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <Link href={product.link} >
                        <ProductCard product={product} sm={true}/>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* Position the buttons absolutely within the relative container */}
            <div className="swiper-button-next-custom absolute top-1/2 right-0 transform -translate-y-1/2 z-10 hover: cursor-pointer shadow-md transition-all duration-300 ease-in-out group">
                <Icon name={'Forward'} height={50} width={50}
                    className="group hover:stroke-secondary transition-all duration-300 ease-in-out" />
            </div>
            <div className="swiper-button-prev-custom absolute top-1/2 left-0 transform -translate-y-1/2 z-10 hover: cursor-pointer shadow-md transition-all duration-300 ease-in-out group">
                <Icon name={'Back'} height={50} width={50}
                    className="group hover:stroke-secondary transition-all duration-300 ease-in-out" />
            </div>
        </div>

    );
};

export default ProductGridSwiper;
