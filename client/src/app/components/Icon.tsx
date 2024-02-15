"use client"
import React, { useEffect, useState, FC } from 'react';

// type for the icon props
interface IconProps {
    name: string;
    className?: string;
    height?: string | number;
    width?: string | number;
}

// type for the imported icon module
type ImportedIconModule = {
    default: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Cache for imported icons
const iconCache: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {};

// Function to dynamically import an icon
const importIcon = async (iconName: string): Promise<ImportedIconModule> => {
    if (iconCache[iconName]) {
        return { default: iconCache[iconName] };
    }

    try {
        const module = await import(`../icons/${iconName}.icon.tsx`);
        iconCache[iconName] = module.default;
        return module as ImportedIconModule;
    } catch (error) {
        console.error(`Unable to import icon: ${iconName}`, error);
        throw new Error(`Unable to import icon: ${iconName}`);
    }
};

// Icon component
const Icon: FC<IconProps> = React.memo(({ name, className, height, width }) => {
    const [IconComponent, setIconComponent] = useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(null);
    const loaderStyles = {
        fontSize: `${width}px`,
        animation: 'spin 4s linear infinite',
        zIndex: 5,
    };

    useEffect(() => {
        importIcon(name).then((ImportedIcon) => {
            setIconComponent(() => ImportedIcon.default);
        }).catch(console.error);
    }, [name]);

    return IconComponent ? (
        <IconComponent className={className} aria-label={name} height={height} width={width} role="img" />
    ) : (
        <span style={loaderStyles}>⏳</span>
    );
});

Icon.displayName = 'Icon';

export default Icon;
