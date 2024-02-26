import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultBlurDataURL from '../../assets/ImageLoader';

interface ImageWithZoomProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    vw: number;

}
const placeholderSrc = defaultBlurDataURL



const ImageWithZoom: React.FC<ImageWithZoomProps> = ({ src, alt, width, height, vw }) => {

    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isZoomed) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPosition({ x, y });
    };


    const handleClick = () => setIsZoomed(!isZoomed);

    const handleImageLoaded = () =>{ 
        setIsLoaded(true)
    };



    const dynamicPosition = "relative" as React.CSSProperties['position'];
    const dynamicObjectFit = "cover" as React.CSSProperties['objectFit']
    const imageContainerStyles = {
        height: height,
        width: width,
        overflow: 'hidden',
        position: dynamicPosition,
    };

    const imageStyles = {
        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        transition: 'transform 0.2s ease-in-out',
        transform: isZoomed ? 'scale(2)' : 'scale(1)',
        objectFit: dynamicObjectFit,
    };

    return (

        <div
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            style={imageContainerStyles}
            aria-label='image-zoom'
        >
            <Image
                src={isLoaded?src:placeholderSrc}
                alt={alt}
                quality={60}
                fill
                sizes={`(max-width: 768px) 50vw,  ${vw}vw`}
                style={imageStyles}
                onLoad={handleImageLoaded}
                className={isLoaded ? '' : 'animate-pulse'}
                onMouseLeave={()=>setIsZoomed(false)}
            />
        </div>

    );
};

export default ImageWithZoom;
