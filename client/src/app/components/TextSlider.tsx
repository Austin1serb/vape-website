
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
//GLOABLS CSS USED FOR SLIDER ARROWS

const TextSlider = () => {
    const messages = ["New Year, New Gears", "Free US Shipping $85+", "Pod Pocket 7500: Buy One, Get One"];

    return (
        <div   className="bg-primary h-14 w-full flex items-center justify-center rounded-none">
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            loop={true}
            autoplay={{ delay: 3000 }}
        >
            {messages.map((message, index) => (
                <SwiperSlide key={index} className="flex justify-center items-center h-full">
                    <h3 className="text-on-primary text-center">{message}</h3> {/* Set the text color */}
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
};

export default TextSlider;
