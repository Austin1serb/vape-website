import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Grid } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import Link from 'next/link';

const BrandIconSlider = () => {
    const brandIcons = [
        // Example brand icons array
        { id: 1, src: 'path/to/brand1.svg', link: '#' },
        { id: 2, src: 'path/to/brand2.svg', link: '#' },
        // Add more brand icons as needed
    ];

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
                navigation={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="my-4"
                breakpoints={{
                    // When window width is <= 640px
                    640: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    // When window width is <= 768px
                    768: {
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                    },
                    // When window width is >= 1024px
                    1024: {
                        slidesPerView: 5,
                        slidesPerGroup: 5,
                    },
                }}
            >
                {brandIcons.map((icon) => (
                    <SwiperSlide key={icon.id}>
                        <Link href={icon.link} className="block p-4">
                            <img src={icon.src} alt={`Brand ${icon.id}`} className="mx-auto" />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BrandIconSlider;
