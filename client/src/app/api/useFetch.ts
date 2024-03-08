
"use server";

import { getData } from './route';

export async function getProducts() {
    const data = await getData('product'); 
    return data;
}
