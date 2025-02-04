// lib/auth.ts
"use server";

import { cookies } from "next/headers";

export async function fetchAuthStatus() {
	try {
		const cookieHeader = cookies().toString();

		const response = await fetch(`${process.env.BACKEND_URL}/api/user/checklogin`, {
			headers: { Cookie: cookieHeader },
			cache: "no-store",
		});

		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error("Error checking login status:", error);
		return { isLoggedIn: false, isAdmin: false, user: {} };
	}
}
