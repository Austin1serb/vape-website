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
        <div style={{ height: height, width: width, position: 'relative', }} className={`object-cover ${className}`}>
            <Image fill quality={50} src={src} alt={alt} className='object-cover p-1' style={style} sizes='5vw' />
        </div>
    )
}

export default BrandImage