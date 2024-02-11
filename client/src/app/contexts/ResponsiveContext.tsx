import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce'


interface ResponsiveContextType {
    screenWidth: number;
    isMobile: boolean;
}

interface Props {
    children: React.ReactNode;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

export const ResponsiveProvider: React.FC<Props> = ({ children }) => {
    const [screenWidth, setScreenWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
    const debouncedScreenWidth = useDebounce(screenWidth, 250); // Debounce screen width update
    const isMobile = debouncedScreenWidth < 768; // Set mobile breakpoint

    useEffect(() => {
        const updateScreenSize = () => {
            setScreenWidth(window.innerWidth);
        };
        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);
        return () => {
            window.removeEventListener('resize', updateScreenSize);
        };
    }, []);

    return (
        <ResponsiveContext.Provider value={{ screenWidth: debouncedScreenWidth, isMobile }}>
            {children}
        </ResponsiveContext.Provider>
    );
};

export const useResponsive = () => {
    const context = useContext(ResponsiveContext);
    if (!context) {
        throw new Error('useResponsive must be used within a ResponsiveProvider');
    }
    return context;
};
