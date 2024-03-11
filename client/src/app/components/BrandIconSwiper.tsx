"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import Link from 'next/link';
import Icon from './Icon';
import BrandImage from './BrandImage';
import { Brand } from './types';
import Forward from '@/Icons/Forward.icon';
import Back from '@/Icons/Back.icon';


interface Props {
    brands: Brand[]
}

const BrandIconSlider: React.FC<Props> = ({ brands }) => {

    const [onMount, setOnMount] = React.useState(false);

    React.useEffect(() => {
        setOnMount(true);
        
    }, []);

    return (

        <div className="mx-auto p-4 px-16 relative">
            <div className={`grid grid-cols-3 md:grid-cols-5 gap-6 ${onMount ? 'hidden' : ''} mt-4 `}>
                {brands.slice(0, 10).map((brand, index) => (
                    <div key={index} className=' flex justify-center items-center '>
                        <Link href={`/shop/${brand.name.toLowerCase()}`} passHref >
                            <div className="block p-4 cursor-pointer hover:scale-90 transition duration-300	" >
                                {/* Use Next.js Image for optimized image handling */}
                                <BrandImage
                                    src={brand.imgSource[0].url}
                                    alt={`Brand ${brand.name}`}
                                    width={150}
                                    height={150}
                                    quality={100}
                                    sizes='30'
                                />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className={onMount ? '' : 'hidden'}>
                <Swiper
                    modules={[Navigation, Autoplay, Grid]}
                    spaceBetween={30}
                    slidesPerView={5}
                    slidesPerGroup={5}
                    grid={{
                        rows: 2,
                        fill: 'row',
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}

                    className="my-4"
                    breakpoints={{
                        // Adjustments for responsive breakpoints
                        140: {
                            slidesPerView: 2,
                            slidesPerGroup: 1,
                        },
                        540: {
                            slidesPerView: 3,
                            slidesPerGroup: 1,
                        },
                        740: {
                            slidesPerView: 4,
                            slidesPerGroup: 1,
                        },
                        1020: {
                            slidesPerView: 5,
                            slidesPerGroup: 1,
                        },

                    }}
                >
                    {brands.map((brand, index) => (
                        <SwiperSlide key={index}>
                            <div key={index + 'brand-div'} className=' flex justify-center items-center '>
                                <Link key={index + 'brand-Link'} href={`/brand/${brand.name.toLowerCase()}`} passHref >
                                    <div key={index + 'brand-dev2'} className="block p-4 cursor-pointer hover:scale-90 transition duration-300	" >
                                        {/* Use Next.js Image for optimized image handling */}
                                        <BrandImage
                                            key={index + 'brand-image'}
                                            src={brand.imgSource[0].url}
                                            alt={`Brand ${brand.name}`}
                                            width={150}
                                            height={150}
                                        />
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/* SWIPER BUTTONS*/}
            <div className="swiper-button-next-custom backdrop-blur-md bg-white/30 absolute top-1/2 right-2 transform -translate-y-1/2 z-10 hover: cursor-pointer shadow-md transition-all duration-300 ease-in-out group" >
                <Forward name={'Forward'} height={'5vw'} width={'5vw'}
                    className=" forward-icon group hover:stroke-secondary transition-all duration-300 ease-in-out" />
            </div>
            <div className="swiper-button-prev-custom absolute backdrop-blur-md bg-white/30 top-1/2 left-2 transform -translate-y-1/2 z-10 hover: cursor-pointer shadow-md transition-all duration-300 ease-in-out group">
                <Back name={'Back'} height={'5vw'} width={'5vw'}
                    className="back-icon group hover:stroke-secondary transition-all duration-300 ease-in-out" />
            </div>
        </div>
    );
};

export default BrandIconSlider;
