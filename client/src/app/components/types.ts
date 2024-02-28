// types.ts

export interface Shipping {
    weight: number | string;
    dimensions: {
        length: number | string;
        width: number | string;
        height: number | string;
    };
};
export interface Brand {
    _id?: string;
    name: string;
    imgSource: ImageSource[];
    description?: string; 
    rating?: number; 
    tags: string[];
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface Product {
    _id?: string | number;
    brand: string;
    name: string;
    price: number;
    specs: string;
    totalSold: number;
    imgSource: Array<{ url: string, publicId?: string }>;
    category: string[];
    description: string;
    strength: string;
    isFeatured: boolean;
    flavor: string;
    seo: {
        title: string;
        description: string;
    };
    seoKeywords: string[];
    shipping: Shipping;
    createdAt?: string;
    updatedAt?: string | undefined;
    __v?: number;
    quantity?: number;
}

export interface Guest {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    address?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    phone?: string;
    orders?: string[];
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface ImageSource {
    publicId?: string;
    url: string;
    _id?: string;
}

export interface SEO {
    title: string;
    description: string;
}


export interface Order {
    _id: string;
    orderNumber: string;
    customer: string;
    customerEmail: string;
    customerPhone: string;
    products: ProductOrdered[];
    shippingMethod: ShippingMethod;
    orderDate: string;
    totalAmount: TotalAmount;
    notes: string;
    address: string;
    orderStatus: string;
    paymentStatus: string;
    transactionId: string;
    createdBy: string;
    createdByType: 'Customer' | 'Admin'; // Adjust based on actual values you have
    createdAt?: string;
    updatedAt?: string;
    __v: number;
}

export interface ProductOrdered {
    productId: string | number;
    name: string;
    price: number;
    quantity: number;
    img: string;
    imageUrl?: string;
    _id: string;
    reviews?: string
}

export interface ShippingMethod {
    provider: string;
    carrierAccountId: string;
    serviceLevelToken: string;
    price: string;
    amountCharged: string;
    type: string;
    carrier: string;
    trackingNumber: string;
    trackingUrl: string;
    labelUrl: string;
    estimatedShipping: string;
}

export interface TotalAmount {
    subTotal: number;
    grandTotal: number;
    tax: number;
    shippingCost: number;
}

export interface Customer {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    isVerified?: boolean;
    isAdmin?: boolean;
    password?: string;
    orders?: string[];
    createdAt?: string;
    updatedAt?: string;
    address: string;
    address2?: string;
    city: string;
    country: string;
    phone: string;
    state: string;
    zip: string;
    __v?: number;



}


