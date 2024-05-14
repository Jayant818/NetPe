import React from "react";
import Link from "next/link";

const Page = async () => {
	return (
		<div className="p-4 flex flex-col pt-6  items-center h-screen w-screen ">
			<h3 className="font-bold text-4xl text-purple-700 mb-8">
				Welcome to Netpe
			</h3>
			<div className="flex flex-col gap-4">
				<Link
					href="/transactions"
					className="text-blue-700 font-light hover:underline"
				>
					Explore Your Transactions
				</Link>
				<Link
					href="/transfer"
					className="text-blue-700 font-light hover:underline"
				>
					Add Money to the Wallet
				</Link>
				<Link href="/p2p" className="text-blue-700 font-light hover:underline">
					Transfer Money using Mobile Number
				</Link>
			</div>
		</div>
	);
};

export default Page;
