// app/layout.tsx
import { Montserrat } from "next/font/google";
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer/Footer";
import NicotineWarning from "@/components/NicotineWarning";
import { ResponsiveProvider } from "@/contexts/ResponsiveContext";
import "./globals.css";
import { Metadata } from "next";
import { CartProvider } from "../contexts/useCart";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import theme from "./theme";
import { ThemeProvider } from "@mui/material";

const monterrat = Montserrat({ weight: ["100", "200", "400", "500", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Home",
	description: "Welcome to Next.js",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={monterrat.className}
		>
			<head>
				{/* Metadata API is used to manage <head> elements */}
				{/* Your Metadata configuration will be applied here */}
			</head>
			<body>
				<ThemeProvider theme={theme}>
					<AppRouterCacheProvider>
						<ResponsiveProvider>
							<NicotineWarning />
							<CartProvider>
								<NavBar />
								{/* Main content of the application */}
								<main>{children}</main>
								<Footer />
							</CartProvider>
						</ResponsiveProvider>
					</AppRouterCacheProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
