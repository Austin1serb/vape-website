
"use server"

import { cookies } from "next/headers";

const BASE_URL = 'http://localhost:8000/api';

export const getData = async (endpoint: string, _id?: string) => {
    try {
        const url = _id ? `${BASE_URL}/${endpoint}/${_id}` : `${BASE_URL}/${endpoint}/`;
        const response = await fetch(url,{
            headers: {
                Cookie: cookies().toString()
            },
            cache:'no-store'
            })

        if (!response.ok) {
            const error = await handleErrors(response);
            throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
};


export const postData = async <T, B>(endpoint: string, body: B): Promise<T> => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await handleErrors(response);
            throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
        }

        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
};



export const deleteData = async <T>(endpoint: string): Promise<T> => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            const error = await handleErrors(response);
            throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
        }

        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
};
export const putData = async <T, B>(endpoint: string, _id: string, body: B): Promise<T> => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}/${_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await handleErrors(response);
            throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
        }

        const data: T = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch Error:", error);
        throw error;
    }
};





//error handling
interface ValidationError {
    [key: string]: string;
}

export const handleErrors = async (response: Response): Promise<ValidationError | string> => {
    if (!response.ok) {
        try {
            const errorData = await response.json();
            // Check if the error is a validation error (400 status code)
            if (response.status === 400 && typeof errorData === 'object') {
                // Return the entire validation error object 
                return errorData;
            } else {
                // For non-validation errors, return a generic message or specific error message
                console.error("Error Data:", errorData);
                return errorData.message || 'An unexpected error occurred. Please try again later.';
            }
        } catch (error) {
            console.error("Error processing response:", error);
            return 'An error occurred while processing the error response. Please try again later.';
        }
    }

    return 'No error from response.';
};





// Auth

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