import NicotineWarning from "@/src/app/components/NicotineWarning";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["100",'200','400'], subsets:['latin'] });
const Layout = ({ children }) => {
  return (
    <div className={poppins.className}>
      <NicotineWarning />
      {/* rest of the layout */}
      {children}
    </div>
  );
};

export default Layout;
