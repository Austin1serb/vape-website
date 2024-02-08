import React from 'react';

// Define a type for the component's props
type IconProps = {
    className?: string;
    height?: string;
    width?: string;
};

const MenuIcon: React.FC<IconProps> = ({ className, height, width }) => {
    return (
<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" className={className} height={height} width={width} xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    )
}

export default MenuIcon