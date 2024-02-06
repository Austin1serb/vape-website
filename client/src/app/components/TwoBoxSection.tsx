import React from 'react';

interface TwoBoxSectionProps {
  text1: string;
  imgUrl1: string;
  text2: string;
  imgUrl2: string;
}

const TwoBoxSection: React.FC<TwoBoxSectionProps> = ({ text1, imgUrl1, text2, imgUrl2 }) => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 p-4">
      {/* Left Box */}
      <div className="relative w-full md:flex-1">
        <img src={imgUrl1} alt="Premium E-Liquids" className="w-full h-auto block" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-white text-xl font-bold">{text1}</p>
          <button className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">Shop Now</button>
        </div>
      </div>

      {/* Right Box */}
      <div className="relative w-full md:flex-1">
        <img src={imgUrl2} alt="Best Vape of 2023" className="w-full h-auto block" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-white text-xl font-bold">{text2}</p>
          <button className="mt-2 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition">Shop Now</button>
        </div>
      </div>
    </div>
  );
};

export default TwoBoxSection;
