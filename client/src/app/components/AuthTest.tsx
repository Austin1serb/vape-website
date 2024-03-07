'use server'
import { useAuthStatus } from '@/api/useAuthStatus';
import React from 'react'

const AuthTest = async () => {
    const { isLoggedIn, isAdmin, user } = await useAuthStatus();

    return (
        <div>
            <div>
                {isLoggedIn ? (
                    <div>
                        <p>Welcome, {user.firstName}!</p>
                        {isAdmin && <p>You have admin access.</p>}
                    </div>
                ) : (
                    <p>Please log in.</p>
                )}
            </div>
        </div>
    )
}

export default AuthTest