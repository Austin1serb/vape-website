import Image from 'next/image'
import React, { CSSProperties } from 'react'

interface Props {
    alt: string,
    src: string,
    height: string | number;
    width: string | number;
    className?: string
    style?: CSSProperties;
    ifStatement?: boolean
}
const BrandImage: React.FC<Props> = ({ alt, src, height, width, className, style, ifStatement }) => {
    return (
        <div style={{ height: ifStatement ? '100px' : '55px', width: '100%', position: 'relative' }} className={`min-w-[${width}px] min-h-[${height}px] max-w-[${width}px] max-h-[${height}px]  relative bg-white `}>
            <Image fill quality={50} src={src} alt={alt} className={`object-contain	 rounded ${className}`} style={style} sizes='5vw'/>
        </div>
    )
}

export default BrandImage