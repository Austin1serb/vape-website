import AgeVerification from "@/src/app/components/AgeVerification";
import ImageSlider from "@/src/app/components/ImageSlider";
import ProductsGrid from "@/src/app/components/ProductsGrid";
import TextSlider from "@/src/app/components/TextSlider";

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
     <ProductsGrid/>
      {/*<AgeVerification onVerify={function (value: boolean=false): void {
        throw new Error("Function not implemented.");
      } }/>*/}
    </div>
  );
}
