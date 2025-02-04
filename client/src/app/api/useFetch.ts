"use server";

import { fetchAuthStatus } from "@/utils/getAuth";
import { getData } from "./routes";

export async function getProducts() {
	const data = await getData("product");
	return data;
}

export async function getBrands() {
	const data = await getData("brand");
	return data;
}

export async function getAuthStatus() {
	const data = await fetchAuthStatus(); // Implement this function to fetch auth status from your API
	return data;
}
