import AgeVerification from "@/src/app/components/AgeVerification";
import ImageSlider from "@/src/app/components/ImageSlider";
import ProductsGrid from "@/src/app/components/TrendingGrid";
import TextSlider from "@/src/app/components/TextSlider";
import TwoBoxSection from "@/src/app/components/TwoBoxSection";
import TrendingGrid from "@/src/app/components/TrendingGrid";

export default function Home() {
  return (
    <div>
      <TextSlider/>
      <div className="m-4">
     <ImageSlider/>
     </div>
     <h2 className="text-center m-8">
      Featured
     </h2>
     <TwoBoxSection 
      text1={'Premium E-Liquids'}
      text2={"Best Vape of 2023"}
      imgUrl1={"https://www.elementvape.com/media/homepage_banners/homepage2024/13_-_Front_Page_Category_Banner_-_Disposables_-_767X343.jpg"}
      imgUrl2={"https://www.elementvape.com/media/homepage_banners/homepage_2023/Front_Page_Banner_-_Best_Vape_Holiday_2023.jpg"}
       />
     <TrendingGrid/>
      {/*<AgeVerification onVerify={function (value: boolean=false): void {
        throw new Error("Function not implemented.");
      } }/>*/}
    
    </div>
  );
}
