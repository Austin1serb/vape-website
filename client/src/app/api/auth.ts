'use server'

import { cookies } from "next/headers";

export async function fetchAuthStatus() {
    try {

        const response = await fetch('http://localhost:8000/api/user/checklogin', {
            headers: {
                Cookie: cookies().toString()
            },
            cache:'no-store'
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking login status:', error);
        return { isLoggedIn: false, isAdmin: false, user:{} };
    }
}
