import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import Image from 'next/image'; // Import Next.js Image component
import Link from 'next/link';
import Icon from './Icon';

interface brandIconData {
    id: number;
    src: string;
    link: string;
    name: string;
}
interface Props {
    brandIcons: brandIconData[]
}

const BrandIconSlider: React.FC<Props> = ({ brandIcons }) => {


    return (
        <div className="mx-auto p-4 relative">
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
                loop={true}
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
                {brandIcons.map((icon) => (
                    <SwiperSlide key={icon.id}>
                        <div className=' flex justify-center items-center '>
                        <Link href={icon.link} passHref >
                            <div className="block p-4 cursor-pointer" style={{width:'13vw', minWidth:'150px'}}>
                                {/* Use Next.js Image for optimized image handling */}
                                <Image src={icon.src} alt={`Brand ${icon.name}`} width={150} height={150} layout="responsive" />
                            </div>
                        </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            {/* SWIPER BUTTONS*/}
            <div className="swiper-button-next-custom backdrop-blur-md bg-white/30 absolute top-1/2 right-2 transform -translate-y-1/2 z-10 hover: cursor-pointer shadow-md transition-all duration-300 ease-in-out group" >
                <Icon name={'Forward'} height={'5vw'} width={'5vw'}
                    className=" forward-icon group hover:stroke-secondary transition-all duration-300 ease-in-out" />
            </div>
            <div className="swiper-button-prev-custom absolute backdrop-blur-md bg-white/30 top-1/2 left-2 transform -translate-y-1/2 z-10 hover: cursor-pointer shadow-md transition-all duration-300 ease-in-out group">
                <Icon name={'Back'} height={'5vw'} width={'5vw'}
                    className="back-icon group hover:stroke-secondary transition-all duration-300 ease-in-out" />
            </div>
        </div>
    );
};

export default BrandIconSlider;
