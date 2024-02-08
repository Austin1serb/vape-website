import React from 'react';

// Define a type for the component's props
type IconProps = React.SVGProps<SVGSVGElement>;

const Forward: React.FC<IconProps> = (props) => {
    return (
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" {...props} xmlns="http://www.w3.org/2000/svg"><path fill="none" strokeMiterlimit="10" strokeWidth="32" d="M64 256c0 106 86 192 192 192s192-86 192-192S362 64 256 64 64 150 64 256z"></path><path fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="m216 352 96-96-96-96"></path></svg>
    )
}

export default Forward