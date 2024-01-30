import AgeVerification from "@/src/app/components/AgeVerification";
import TextSlider from "@/src/app/components/TextSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <TextSlider/>
      <h1>Hello World</h1>
      {/*<AgeVerification onVerify={function (value: boolean=false): void {
        throw new Error("Function not implemented.");
      } }/>*/}
    </div>
  );
}
