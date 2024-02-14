import Footer from "@/src/app/components/Footer";
import NavBar from "@/src/app/components/NavBar";
import NicotineWarning from "@/src/app/components/NicotineWarning";
import { Montserrat } from "next/font/google";
import React from 'react';

const poppins = Montserrat({ weight: ["100",'200','400','500','700'], subsets:['latin'] });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={poppins.className}>
      <NicotineWarning />
      <NavBar/>
      {/* rest of the layout */}
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;
