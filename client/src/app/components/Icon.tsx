import React, { useEffect, useState, FC, ReactElement } from 'react';

// Define a type for the icon props
interface IconProps {
    name: string;
    className?: string;
    height?: string | number;
    width?: string | number;
}

// Define a type for the imported icon module
type ImportedIconModule = {
    default: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

// Function to dynamically import an icon
const importIcon = async (iconName: string): Promise<ImportedIconModule> => {
    try {
        const mod = await import(`../icons/${iconName}.icon.tsx`) as ImportedIconModule;
        return mod;
    } catch (error) {
        throw new Error(`Unable to import icon: ${iconName}`);
    }
};

// Icon component
const Icon: FC<IconProps> = React.memo(({ name, className, height, width }) => {
    const [IconComponent, setIconComponent] = useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(null);
    const iconStyles={
        fontSize: '30px',
        animation: 'spin 2s linear infinite',
        zIndex: 5,
    }

    useEffect(() => {
        importIcon(name).then(ImportedIcon => {
            const DynamicIconComponent: FC<React.SVGProps<SVGSVGElement>> = (props): ReactElement => <ImportedIcon.default {...props} />;
            DynamicIconComponent.displayName = `${name}Icon`; // Assign a display name
            setIconComponent(() => DynamicIconComponent);
        }).catch(console.error);
    }, [name]);

    return IconComponent ? (
        <IconComponent className={className} height={height} width={width} />
    ) : (
        <div style={iconStyles}>
            ⏳
        </div>
    );
});

Icon.displayName = 'Icon'; // Assign a display name to the main component

export default Icon;
