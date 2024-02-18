import React, { useState } from 'react';
import styles from './ImageWithZoom.module.css'; // Ensure your CSS module is correctly set up
import Image from 'next/image';
import ImageLoader from '../../assets/ImageLoader'
interface ImageWithZoomProps {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const ImageWithZoom: React.FC<ImageWithZoomProps> = ({ src, alt, width, height }) => {
    const [isZoomed, setIsZoomed] = useState<boolean>(false);
    const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });

    const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
        if (!isZoomed) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        setZoomPosition({ x, y });
    };

    const handleClick = () => setIsZoomed(!isZoomed);
    const imageStyles={
        cursor: isZoomed ? 'zoom-out' : 'zoom-in',
        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
        transition: 'transform 0.3s ease-in-out',
        transform: isZoomed ? 'scale(2)' : 'scale(1)',
    }
    return (
        <div
            className={styles.imageContainer}
            onClick={handleClick}
        >
            <Image
                src={src}
                alt={alt}
                className={isZoomed ? styles.zoomedImage : ''}
                onMouseMove={handleMouseMove}
                quality={60}
                fill        
                sizes="(max-width: 768px) 50vw,  30vw"
                style={imageStyles}
            />
        </div>
    );
};

export default ImageWithZoom;
