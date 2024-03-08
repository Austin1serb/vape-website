import AgeVerification from "../components/AgeVerification";
import ImageSlider from "../components/ImageSlider";
import TextSlider from "../components/TextSlider";
import TwoBoxSection from "../components/TwoBoxSection";
import ProductGrid from "../components/ProductGrid";
import ProductGridSwiper from "../components/ProductGridSwiper";
import BrandIconSlider from "../components/BrandIconSwiper";
import BoxLinks from "../components/BoxLinks";
import { NextPage } from "next";
import SubscribeField from "../components/SubscribeField";
import { getProducts } from "@/api/useFetch";


  
const Home: NextPage = async () => {
  const products = await getProducts()

  //const products = [
  //  { id: 1, name: 'MTRX 12000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/g/e/geek_vape_-_t200_aegis_touch_-_kits_-_all_colors.png', price: 99.99, reviews: 4.8, link: '#' },
  //  { id: 2, name: 'Innokin Klypse Pod System', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/o/x/oxbar_magic_maze_pro_10000_disposable_-_pod_juice_default.png', price: 89.99, reviews: 5, link: '#' },
  //  { id: 3, name: 'Lost Mary MT15000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/p/a/pax_labs_pax_plus_-_all_colors.png', price: 79.99, reviews: 3, link: '#' },
  //  { id: 1, name: 'MTRX 12000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/g/e/geek_vape_-_t200_aegis_touch_-_kits_-_all_colors.png', price: 99.99, reviews: 4.5, link: '#' },
  //  { id: 2, name: 'Innokin Klypse Pod System', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/o/x/oxbar_magic_maze_pro_10000_disposable_-_pod_juice_default.png', price: 89.99, reviews: 5, link: '#' },
  //  { id: 3, name: 'Lost Mary MT15000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/cache/9c4ebe5b1008ad09d92e6b4f5ae41f93/p/a/pax_labs_pax_plus_-_all_colors.png', price: 79.99, reviews: 3, link: '#' },
  //];

  const featuredProducts = [
    { id: 1, name: 'MTRX 12000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/u/n/uno_mas_x_10k_disposable_-_default.png', price: 99.99, reviews: 4.5, link: '#' },
    { id: 2, name: 'Innokin Klypse Pod System', imageUrl: 'https://www.elementvape.com/media/catalog/product/i/n/innokin_klypse_zip_pod_system_-_default.png', price: 89.99, reviews: 5, link: '#' },
    { id: 3, name: 'Lost Mary MT15000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/e/l/elfbar_zero_nicotine_bc5000_disposable_-_all_flavors.png', price: 79.99, reviews: 3, link: '#' },
    { id: 1, name: 'MTRX 12000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/i/n/innokin_-_klypse_replacement_pods_-_accessories_-_3_pack.png', price: 99.99, reviews: 4.8, link: '#' },
    { id: 2, name: 'Innokin Klypse Pod System', imageUrl: 'https://www.elementvape.com/media/catalog/product/i/n/innokin_-_sceptre_tube_-_pod_kit_-_all_colors.png', price: 89.99, reviews: 5, link: '#' },
    { id: 3, name: 'Lost Mary MT15000 Disposable', imageUrl: 'https://www.elementvape.com/media/catalog/product/m/t/mtrx_12000_disposable_-_default_1.png', price: 79.99, reviews: 3, link: '#' },
  ];
  const imageData = [

    {
      url: 'https://i.imgur.com/itLlTYC.jpeg',
      link: '/path-to-destination-1',
    },
    {
      url: 'https://i.imgur.com/NXxW1Ny.jpeg',
      link: '/path-to-destination-1',
    },
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
  const brandIcons = [
    {
      id: 1,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/Vapetasia_color_200x200_.png',
      link: '#',
      name: 'brandName'
    },
    {
      id: 2,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/Pod_Juice_Color_Transparent.png',
      link: '#',
      name: 'brandName'
    },
    {
      id: 3,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/geek_vape_logo.jpg',
      link: '#',
      name: 'brandName'
    },
    {
      id: 4,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/slider_s_m_smok.jpg',
      link: '#',
      name: 'brandName'
    },
    {
      id: 5,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/Ruthless_Logo_-_Black_200x200_.png',
      link: '#',
      name: 'brandName'
    },
    {
      id: 6,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/7_daze.jpg',
      link: '#',
      name: 'brandName'
    },
    {
      id: 7,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/slider_s_m_smok.jpg',
      link: '#',
      name: 'brandName'
    },
    {
      id: 7,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/slider_i_n_innokin.jpg',
      link: '#',
      name: 'brandName'
    },
    {
      id: 1,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/Vapetasia_color_200x200_.png',
      link: '#',
      name: 'brandName'
    },
    {
      id: 2,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/Pod_Juice_Color_Transparent.png',
      link: '#',
      name: 'brandName'
    },
    {
      id: 3,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/geek_vape_logo.jpg',
      link: '#',
      name: 'brandName'
    },
    {
      id: 4,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/slider_s_m_smok.jpg',
      link: '#',
      name: 'brandName'
    },
    {
      id: 5,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/Ruthless_Logo_-_Black_200x200_.png',
      link: '#',
      name: 'brandName'
    },
    {
      id: 6,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/7_daze.jpg',
      link: '#',
      name: 'brandName'
    },
    {
      id: 7,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/slider_s_m_smok.jpg',
      link: '#',
      name: 'brandName'
    },
    {
      id: 7,
      src: 'https://www.elementvape.com/media/amasty/shopby/option_images/slider/slider_i_n_innokin.jpg',
      link: '#',
      name: 'brandName'
    },

  ]


  return (
    <div>

      <div className="mx-auto max-w-7xl">
        <TextSlider />

        <ImageSlider imageData={imageData} />
        <TwoBoxSection
          text1={'Premium E-Liquids'}
          text2={"Best Vape of 2023"}
          imgUrl1={"https://www.elementvape.com/media/homepage_banners/homepage2024/13_-_Front_Page_Category_Banner_-_Disposables_-_767X343.jpg"}
          imgUrl2={"https://www.elementvape.com/media/homepage_banners/homepage_2023/Front_Page_Banner_-_Best_Vape_Holiday_2023.jpg"}
        />
        <h2 className="text-center text-3xl font-bold uppercase">
          Trending
        </h2>
        <ProductGridSwiper products={featuredProducts} id={1} sm={true} />
        {/*<AgeVerification onVerify={function (value: boolean=false): void {
        throw new Error("Function not implemented.");
      } }/>*/}
      </div>
      <div className="bg-gray-100 rounded-none py-12">
        <h2 className="text-center text-3xl font-normal p-4 uppercase rounded-none">
          New Arrivals
        </h2>
        <div className="mx-auto max-w-7xl">
          <ProductGridSwiper products={products} id={2} sm={false} />
        </div>
      </div>
      <div className="py-8 mx-auto max-w-7xl">
        <TwoBoxSection
          text1={'New Disposables'}
          text2={"New Mods"}
          imgUrl1={"https://www.elementvape.com/media/homepage_banners/homepage_2023/Front_Page_Banner_-_Customers_Love_Us_Holiday_2023.jpg"}
          imgUrl2={"https://www.elementvape.com/media/homepage_banners/homepage2024/Front_Page_Category_Banner_-_767X343_1_.jpg"}
        />
      </div>
      <div className="bg-gray-100 rounded-none py-16" >
        <h2 className="text-center text-3xl font-normal p-4 uppercase">
          Best sellers
        </h2>
        <div className="mx-auto max-w-7xl">
          <ProductGrid products={products} sm={false} />
        </div>
      </div>
      <div className="mt-8 pt-8" >
        <h2 className="text-center text-3xl font-normal p-4 uppercase">
          featured Brands
        </h2>
        <BrandIconSlider brandIcons={brandIcons} />
      </div>
      <div>
        <BoxLinks />
      </div>
      <SubscribeField />


    </div>
  );
}
export default Home