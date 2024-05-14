"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
	const [number, setNumber] = useState("");
	const [password, setPassword] = useState("");

	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		if (number.length > 0 && password.length > 0) {
			setDisabled(false);
		}
	}, [number, password]);

	// const router = useRouter();
	const handleLogin = async () => {
		// Handle login logic here
		console.log("Logging in with", number, password);

		signIn("credentials", { phone: number, password });
		// console.log("Done");
		// redirect("/dashboard");
	};

	const session = useSession();
	if (session.data?.user) {
		console.log(session);
		redirect("/dashboard");
	}
	return (
		<div className="flex justify-center items-center bg-slate-100 w-full h-screen">
			<div className="bg-white border rounded-xl p-6 flex flex-col justify-center items-center shadow-lg gap-4 w-[30%]">
				<div className="text-2xl flex justify-center font-extrabold text-[#008cff] mt-2">
					Netpe
				</div>

				<div className="space-y-2">
					<p>Phone Number</p>
					<input
						name="number"
						type="text"
						value={number}
						onChange={(e) => {
							setNumber(e.target.value);
						}}
						placeholder="Enter your phone number"
						className="border rounded-lg px-4 py-2 w-[25rem]"
					/>
				</div>
				<div className="space-y-2">
					<p>Password:</p>
					<input
						name="password"
						type="password"
						placeholder="Enter Password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						className="border rounded-lg px-4 py-2 w-[25rem]"
					/>
				</div>
				<Link
					className="underline text-blue-700 font-light text-sm"
					href="/Signup"
				>
					New User? Sign Up
				</Link>
				<button
					onClick={handleLogin}
					className="w-[25rem] bg-[#008cff] py-2 rounded-xl"
					disabled={disabled}
				>
					Login
				</button>
			</div>
		</div>
	);
};

export default Page;
