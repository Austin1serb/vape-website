'use server'

import { useAuthStatus } from '@/api/useFetch';
import React from 'react'

const page =async () => {
  const { isLoggedIn, isAdmin, user } = await  useAuthStatus();

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

export default page