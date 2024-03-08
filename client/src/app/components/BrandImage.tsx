import Image from 'next/image'
import React, { CSSProperties } from 'react'

interface Props {
    alt: string,
    src: string,
    height: string|number ;
    width: string|number ;
    className?: string
    style?: CSSProperties;
    ifStatement?: boolean
    quality?:number
    sizes?:string
}
const BrandImage: React.FC<Props> = ({ alt, src, height, width, className, style, ifStatement, quality , sizes}) => {
    return (
        <div style={{ height: height, width: width, position: 'relative', }} className={`${className ?? ''}`}>
            <Image fill quality={quality||50} src={src} alt={alt} style={style} sizes={sizes+'vw'||'5vw'} />
        </div>
    )
}

export default BrandImage