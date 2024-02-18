"use client"
import React, { useState } from 'react'
import ProductPage from '../components/ProductPage'
import QuickView from '../components/QuickViewComponent/QuickView'




const producdId='6556ba88b51ebf2c44347408'
const products=[
    {_id: "6556ba88b51ebf2c44347408",
        brand: "Koi",
        name: "Koi CBD Gummies | 60ct",
        price: 59.99,
        specs: "Gummies / 10mg ea / 60 count",
        imgSource: [
            {
              publicId: "product_images/iqn9jj0mi90gm6ii4eg9",
              url: "https://res.cloudinary.com/dardhjv6e/image/upload/v1700182655/product_images/iqn9jj0mi90gm6ii4eg9.png",
              _id: "656fbbd89863a945e5d76bd1"
            },
            {
              publicId: "product_images/qgb8ekfdtrini6xttodm",
              url: "https://res.cloudinary.com/dardhjv6e/image/upload/v1700182659/product_images/qgb8ekfdtrini6xttodm.png",
              _id: "656fbbd89863a945e5d76bd2"
            },
            {
              publicId: "product_images/iv3kkilrgifiznfvmikc",
              url: "https://res.cloudinary.com/dardhjv6e/image/upload/v1700182663/product_images/iv3kkilrgifiznfvmikc.png",
              _id: "656fbbd89863a945e5d76bd3"
            }
        ],
      category: [
          'cbd',
          'gummies',
        ],
      flavor: "Berry Lemonade",
      description: "Come back to the center and find your sense of balance. Made with 20 mg of Koi PRIZM™ Broad Spectrum CBD per serving (2 gummies), these sweet Berry Lemonade flavor gummies deliver a great-tasting wellness experience. Designed for everyday wellness support, Koi Anytime Balance broad spectrum CBD gummies are an easy (and vegan) way to get your daily serving of balancing CBD.\n\nKoi broad spectrum CBD gummies are consistently blended for even cannabinoid distribution. Each batch is third-party tested for compliance, purity, and consistency.",
      strength: "low",
      isFeatured: true,
      seoKeywords: [],
      createdAt: "2023-11-17T00:57:44.632Z",
      updatedAt: "2023-12-06T00:10:00.360Z",
      __v: 0,
      totalSold: 3
    },
]
const page = () => {
    const [quickViewOpen, setQuickViewOpen] = useState<boolean>(true);

  return (
    <QuickView productId={producdId} open={quickViewOpen} handleClose={() => setQuickViewOpen(false)} products={products}/>
  )
}

export default page