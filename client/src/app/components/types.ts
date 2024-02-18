// types.ts

export interface Product {
    _id: string;
    brand: string;
    name: string;
    price: number;
    specs: string;
    imgSource: { publicId: string; url: string; _id: string }[];
    category: string[];
    flavor: string;
    description: string;
    strength: string;
    isFeatured: boolean;
    seoKeywords: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalSold: number;
}
