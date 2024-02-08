import AgeVerification from "@/src/app/components/AgeVerification";
import ImageSlider from "@/src/app/components/ImageSlider";
import ProductsGrid from "@/src/app/components/TrendingGrid";
import TextSlider from "@/src/app/components/TextSlider";
import TwoBoxSection from "@/src/app/components/TwoBoxSection";
import TrendingGrid from "@/src/app/components/TrendingGrid";
import ProductGridSwiper from "@/src/app/components/ProductGridSwiper";

export default function Home() {

  const products = [
    { id: 1, name: 'MTRX 12000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/g/e/geek_vape_-_t200_aegis_touch_-_kits_-_all_colors.png', price: 99.99, reviews: 4.8,link:'#' },
    { id: 2, name: 'Innokin Klypse Pod System', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/o/x/oxbar_magic_maze_pro_10000_disposable_-_pod_juice_default.png', price: 89.99, reviews: 5, link:'#' },
    { id: 3, name: 'Lost Mary MT15000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/p/a/pax_labs_pax_plus_-_all_colors.png', price: 79.99, reviews: 3, link:'#' },
    { id: 1, name: 'MTRX 12000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/g/e/geek_vape_-_t200_aegis_touch_-_kits_-_all_colors.png', price: 99.99, reviews: 4.5, link:'#' },
    { id: 2, name: 'Innokin Klypse Pod System', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/o/x/oxbar_magic_maze_pro_10000_disposable_-_pod_juice_default.png', price: 89.99, reviews: 5, link:'#' },
    { id: 3, name: 'Lost Mary MT15000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/p/a/pax_labs_pax_plus_-_all_colors.png', price: 79.99, reviews: 3, link:'#' },
];

  const featuredProducts = [
    { id: 1, name: 'MTRX 12000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/u/n/uno_mas_x_10k_disposable_-_default.png', price: 99.99, reviews: 4.5,link:'#' },
    { id: 2, name: 'Innokin Klypse Pod System', imageUrl: 'https://www.elementvape.com/media/catalog/product/i/n/innokin_klypse_zip_pod_system_-_default.png', price: 89.99, reviews: 5, link:'#' },
    { id: 3, name: 'Lost Mary MT15000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/e/l/elfbar_zero_nicotine_bc5000_disposable_-_all_flavors.png', price: 79.99, reviews: 3, link:'#' },
    { id: 1, name: 'MTRX 12000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/i/n/innokin_-_klypse_replacement_pods_-_accessories_-_3_pack.png', price: 99.99, reviews: 4.8, link:'#' },
    { id: 2, name: 'Innokin Klypse Pod System', imageUrl: 'https://www.elementvape.com/media/catalog/product/i/n/innokin_-_sceptre_tube_-_pod_kit_-_all_colors.png', price: 89.99, reviews: 5, link:'#' },
    { id: 3, name: 'Lost Mary MT15000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/m/t/mtrx_12000_disposable_-_default_1.png', price: 79.99, reviews: 3, link:'#' },
];
const imageData = [
  {
      url: 'https://www.elementvape.com/media/slideshow/cache/1380x569/homepage_banners/homepage2024/FRONT_PAGE_-_XROS_PRO_1380X569.jpg',
      link: '/path-to-destination-1', 
  },
  {
      url: 'https://www.elementvape.com/media/slideshow/cache/1380x569/homepage_banners/Smok_Mag-18_Nord_5_Front_Page.jpg',
      link: '/path-to-destination-2', 
  },
  {
      url: 'https://www.elementvape.com/media/slideshow/cache/1380x569/homepage_banners/homepage2024/1380-x-569.jpg',
      link: '/path-to-destination-3', 
  },
];
  return (
    <div>
      <TextSlider/>

     <ImageSlider imageData={imageData}/>
     <TwoBoxSection 
      text1={'Premium E-Liquids'}
      text2={"Best Vape of 2023"}
      imgUrl1={"https://www.elementvape.com/media/homepage_banners/homepage2024/13_-_Front_Page_Category_Banner_-_Disposables_-_767X343.jpg"}
      imgUrl2={"https://www.elementvape.com/media/homepage_banners/homepage_2023/Front_Page_Banner_-_Best_Vape_Holiday_2023.jpg"}
       />
       <h2 className="text-center text-3xl font-bold uppercase">
        Trending
       </h2>
     <ProductGridSwiper products={featuredProducts}/>
      {/*<AgeVerification onVerify={function (value: boolean=false): void {
        throw new Error("Function not implemented.");
      } }/>*/}
      <div className="bg-gray-100" >
       <h2 className="text-center text-3xl font-normal p-4 uppercase">
        New Arrivals
       </h2>
       <TrendingGrid  products={products}/>
       </div>
    </div>
  );
}
