import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay,Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';

// Assuming you have a list of image URLs
const imageUrls = [
    'https://www.elementvape.com/media/slideshow/cache/1380x569/homepage_banners/homepage2024/FRONT_PAGE_-_XROS_PRO_1380X569.jpg',
    'https://www.elementvape.com/media/slideshow/cache/1380x569/homepage_banners/Smok_Mag-18_Nord_5_Front_Page.jpg',
    'https://www.elementvape.com/media/slideshow/cache/1380x569/homepage_banners/homepage2024/1380-x-569.jpg',
  
];

const ImageSlider = () => {
    return (
        <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop={true}
            className="my-4"
        >
            {imageUrls.map((url, index) => (
                <SwiperSlide key={index}>
                    <Image src={url} alt={`Slide ${index}`} className="w-full h-auto " width={1390} height={569} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageSlider;
