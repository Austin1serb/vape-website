import NicotineWarning from "@/src/app/components/NicotineWarning";
import { Poppins } from "next/font/google";
import React from 'react';

const poppins = Poppins({ weight: ["100",'200','400'], subsets:['latin'] });

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={poppins.className}>
      <NicotineWarning />
      {/* rest of the layout */}
      {children}
    </div>
  );
};

export default Layout;
