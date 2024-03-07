
"use server"

const BASE_URL = 'http://localhost:8000/api';

export const getData = async (endpoint: string, _id?: string) => {
    try {
        const url = _id ? `${BASE_URL}/${endpoint}/${_id}` : `${BASE_URL}/${endpoint}/`;
        const response = await fetch(url)

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




export async function fetchData(url: string) {
    const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json();
}




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

