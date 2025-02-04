"use server";
import { getAuthStatus } from "@/api/useFetch";
import React from "react";

const AuthTest = async () => {
	const { isLoggedIn, isAdmin, user } = await getAuthStatus();

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
	);
};

export default AuthTest;
