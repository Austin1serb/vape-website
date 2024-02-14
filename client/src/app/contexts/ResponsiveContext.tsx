'use client'

// ResponsiveContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';
import useWindowSize from '../hooks/useWindowSize';
import { useDebounce } from '../hooks/useDebounce';

interface ResponsiveContextType {
    width: number | undefined;
    height: number | undefined;
    isMobile: boolean;
}

const ResponsiveContext = createContext<ResponsiveContextType | undefined>(undefined);

interface Props {
    children: ReactNode;
}

export const ResponsiveProvider: React.FC<Props> = ({ children }) => {
    const { width, height } = useWindowSize();
    const debouncedScreenWidth = useDebounce(width, 250);
    const debouncedScreenHeight = useDebounce(height, 250);
    const isMobile = debouncedScreenWidth ? debouncedScreenWidth < 1024 : false;
    

    return (
        <ResponsiveContext.Provider value={{ width:debouncedScreenWidth, height:debouncedScreenHeight, isMobile }}>
            {children}
        </ResponsiveContext.Provider>
    );
};

export const useResponsive = (): ResponsiveContextType => {
    const context = useContext(ResponsiveContext);
    if (!context) {
        throw new Error('useResponsive must be used within a ResponsiveProvider');
    }
    return context;
};
