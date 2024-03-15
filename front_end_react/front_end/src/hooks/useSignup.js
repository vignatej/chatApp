import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ fullName, username, password, confirmPassword, consumer_or_businessRepresentative }) => {
		console.log({ fullName, username, password, confirmPassword, consumer_or_businessRepresentative });
		const success = handleInputErrors({ fullName, username, password, confirmPassword, consumer_or_businessRepresentative });
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, consumer_or_businessRepresentative }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			console.log(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({ fullName, username, password, confirmPassword, consumer_or_businessRepresentative }) {
	if (!fullName || !username || !password || !confirmPassword || !consumer_or_businessRepresentative) {
		console.log("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		console.log("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		console.log("Password must be at least 6 characters");
		return false;
	}

	return true;
}