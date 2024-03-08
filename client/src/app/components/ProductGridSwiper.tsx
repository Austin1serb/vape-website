"use client"
import React from 'react';
import { Navigation, Autoplay } from 'swiper/modules';
import dynamic from 'next/dynamic';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import ProductCard from './ProductCard';
import Icon from './Icon';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import Back from '@/Icons/Back.icon';
import Forward from '@/Icons/Forward.icon';
import { Product } from './types';



interface Props {
    products: Product[];
    id: number;
    sm: boolean
}

const ProductGridSwiper: React.FC<Props> = ({ products, id, sm }) => {
    const [onMount, setOnMount] = React.useState(false);

    React.useEffect(() => {
        setOnMount(true);

    }, []);

    const nextButtonId = `swiper-${id}-next`;
    const prevButtonId = `swiper-${id}-prev`;
    return (
        <div className="mx-auto p-4 relative"> {/* Make sure this div is positioned relatively */}
            <div className={`grid grid-cols-3 md:grid-cols-5 gap-6  ${onMount ? 'hidden' : 'false'} mt-4 `}>
                {products.slice(0, 5).map((product, index) => (
                    <Link href={'product.link'} key={index}>
                        <div style={{ maxHeight: '250px', maxWidth: '250px', }} className='mx-0.5'>
                            <ProductCard product={product} sm={true} />
                        </div>
                    </Link>
                ))}
            </div>
            <div className={onMount ? '' : 'hidden'}>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={3}
                    navigation={{
                        nextEl: `#${nextButtonId}`,
                        prevEl: `#${prevButtonId}`,
                    }}

                    virtual={false}
                    autoplay={{ delay: sm ? 5000 : 3500, disableOnInteraction: false }}
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
                            <Link href={'product.link'} >
                                <div style={{ maxHeight: '250px', maxWidth: '250px' }}>
                                    <ProductCard product={product} sm={true} />
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
            {/* SWIPER BUTTONS*/}
            <div id={'nextButtonId'} className="swiper-button-next-custom backdrop-blur-md bg-white/30 absolute top-1/2 right-2 transform -translate-y-1/2 z-10 hover: cursor-pointer shadow-md transition-all duration-300 ease-in-out group rounded-xl" >
                <Forward name={'Forward'} height={'5vw'} width={'5vw'}
                    className="back-icon group hover:stroke-secondary transition-all duration-300 ease-in-out" />
            </div>
            <div id={prevButtonId} className="swiper-button-prev-custom absolute backdrop-blur-md bg-white/30 top-1/2 left-2 transform -translate-y-1/2 z-10 hover: cursor-pointer shadow-md transition-all duration-300 ease-in-out group rounded-xl">
                <Back name={'Back'} height={'5vw'} width={'5vw'}
                    className="forward-icon group hover:stroke-secondary transition-all duration-300 ease-in-out" />
            </div>
        </div>

    );
};

export default ProductGridSwiper;
