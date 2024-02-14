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
    id:number;
    sm:boolean
}

const ProductGridSwiper: React.FC<Props> = ({ products,id,sm }) => {
    const nextButtonId = `swiper-${id}-next`;
    const prevButtonId = `swiper-${id}-prev`;
    return (
        <div className="mx-auto p-4 relative"> {/* Make sure this div is positioned relatively */}
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={3}
                navigation={{
                    nextEl: `#${nextButtonId}`,
                    prevEl: `#${prevButtonId}`,
                }}
                autoplay={{ delay:sm? 5000:3500, disableOnInteraction: false }}
                loop={true}
                className="my-4"
                breakpoints={{
                    // Adjustments for responsive breakpoints
                    140: {
                        slidesPerView: 3,
                
                    },
                    840: {
                        slidesPerView: 4,
                
                    },
                    1040: {
                        slidesPerView: 5,
                
                    },
                }}
            >
                {products.map((product, index) => (
                    <SwiperSlide key={index}>
                        <Link href={product.link} >
                        <ProductCard product={product} sm={true}/>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* SWIPER BUTTONS*/}
            <div id={nextButtonId}  className="swiper-button-next-custom backdrop-blur-md bg-white/30 absolute top-1/2 right-2 transform -translate-y-1/2 z-10 hover: cursor-pointer shadow-md transition-all duration-300 ease-in-out group rounded-xl" >
                <Icon name={'Forward'} height={'5vw'} width={'5vw'}
                    className="back-icon group hover:stroke-secondary transition-all duration-300 ease-in-out"/>
            </div>
            <div id={prevButtonId}  className="swiper-button-prev-custom absolute backdrop-blur-md bg-white/30 top-1/2 left-2 transform -translate-y-1/2 z-10 hover: cursor-pointer shadow-md transition-all duration-300 ease-in-out group rounded-xl">
                <Icon name={'Back'} height={'5vw'} width={'5vw'}
                    className="forward-icon group hover:stroke-secondary transition-all duration-300 ease-in-out" />
            </div>
        </div>

    );
};

export default ProductGridSwiper;
