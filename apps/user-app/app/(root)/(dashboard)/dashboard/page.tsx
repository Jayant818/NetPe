import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";
import SendMoneyBtn from "../../../../components/SendMoneyBtn";
import Link from "next/link";

const getAllUsers = async () => {
	const user = await prisma.user.findMany();
	return user;
};

const Page = async () => {
	const session = await getServerSession(authOptions);
	const users = await getAllUsers();

	const balance = await prisma.balance.findUnique({
		where: {
			id: Number(session.user.id),
		},
	});

	console.log("All Users", users);

	return (
		<div className="p-4 flex flex-col pt-6   h-screen w-screen ">
			<h3 className="font-bold text-4xl text-purple-700 mb-8 tracking-widest">
				Hi, {session?.user?.name} 👋
			</h3>

			<p className="text-lg font-bold tracking-wide">
				Your Balance : Rs {balance?.amount! / 100} /-
			</p>
			<div className="mt-10  w-[50%] space-y-4">
				<h3 className="p-4 w-full text-center text-lg font-bold tracking- border-b-2">
					All Users
				</h3>

				{users.map((u:any) => (
					<div
						key={u.id}
						className="flex justify-between items-center border-b-2 pb-1 px-4"
					>
						<div className="text-lg font-medium tracking-wide">{u.name}</div>
						<SendMoneyBtn number={u.number} />
					</div>
				))}
			</div>

			<div className="flex flex-col gap-4 px-4 mt-6">
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
