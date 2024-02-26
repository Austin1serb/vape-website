// Import Next.js Image component for optimized images
import Image from 'next/image';
import React from 'react';

interface Props {
    src: string;
    alt: string;
    text: string;

}
// Define a custom component for the box
const ImageBox: React.FC<Props> = ({ src, alt, text }) => (
    <div className="relative w-full h-96 group" >
        <Image src={src} alt={alt} fill className="transition-opacity duration-300 group-hover:opacity-100 object-cover	rounded-lg"
            sizes="(max-width: 768px) 40vw, (max-width: 1020px) 45vw, 20vw"

        />
        <div className="absolute inset-2 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center group-hover:bg-opacity-20 transition duration-300 ">
            <p className="text-white text-xxl backdrop-blur-md shadow-xl p-2  m-4 rounded ">{text}</p>
            <button className="absolute bottom-20 p-2 border text-white rounded backdrop-blur-md shadow-xl hover:bg-primary hover:opacity-80 transition-all duration-300">Learn More</button>
        </div>
    </div>
);


// Main component rendering 4 ImageBox components
const ImageGallery = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-4 ">
        <ImageBox
            src="https://i.imgur.com/UvZMD3t.png"
            alt="image (SEO)"
            text="Free Shipping Over $85" />
        <ImageBox
            src="https://i.imgur.com/eU8r07z.jpeg"
            alt="(SEO)"
            text="Become a VIP" />
        <ImageBox
            src="https://i.imgur.com/IhDo55D.jpeg"
            alt="(SEO)e"
            text="Clearance" />
        <ImageBox
            src="https://i.imgur.com/RDWBfn4.jpeg"
            alt="(SEO)"
            text="Weekly Coupons" />

    </div>
);

export default ImageGallery;
