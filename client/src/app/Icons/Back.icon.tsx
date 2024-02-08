import React from 'react';

// Define a type for the component's props
type IconProps = {
    className?: string;
    height?: string;
    width?: string;
};

const BackIcon: React.FC<IconProps> = ({ className, height, width }) => {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512"className={className} height={height} width={width}  xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeMiterlimit="10" strokeWidth="32" d="M256 64C150 64 64 150 64 256s86 192 192 192 192-86 192-192S362 64 256 64z"></path><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m296 352-96-96 96-96"></path></svg>
    )
}

export default BackIcon