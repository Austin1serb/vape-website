import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Image from 'next/image';
import Link from 'next/link';


interface ImageDataItem {
    url: string;
    link: string;
}

interface Props {
    imageData: ImageDataItem[];
}


const ImageSlider: React.FC<Props> = ({ imageData }) => {
    return (
        <div className="">
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
                {imageData.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link href={item.link}>
                            <Image src={item.url} alt={`Slide ${index}`} className="w-full h-auto " width={1390} height={569} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageSlider;
