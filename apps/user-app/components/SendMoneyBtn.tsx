"use client";
import { redirect, useRouter } from "next/navigation";

const SendMoneyBtn = ({ number }: { number: string }) => {
	const router = useRouter();
	const handleClick = () => {
		console.log("Clicked");
		router.push(`/p2p?number=${number}`);
	};
	return (
		<button
			className="bg-black text-white py-2 px-4 rounded-md"
			onClick={handleClick}
		>
			Send Money
		</button>
	);
};

export default SendMoneyBtn;
