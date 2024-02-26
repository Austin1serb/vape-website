// app/layout.tsx
import { Montserrat } from "next/font/google";
import React from 'react';
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import darkTheme from "./theme";
import { CssBaseline } from "@mui/material";

const montserrat = Montserrat({ weight: ["100", '200', '400', '500', '700'], subsets: ['latin'] });


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className={montserrat.className}>
            <head>
                {/* Metadata API is used to manage <head> elements */}
                {/* Your Metadata configuration will be applied here */}
            </head>
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={darkTheme}>
                        {/* Main content of the application */}
                        <main>{children}</main>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
