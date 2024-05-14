import React from "react";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../../lib/auth";
import OnRampTransactions from "../../../../components/OnRampTransactions";

async function getOnRampTransactions() {
	const session = await getServerSession(authOptions);
	const txns = await prisma.onRampTransaction.findMany({
		where: {
			userId: Number(session?.user?.id),
		},
	});

	return txns.map((t: any) => ({
		time: t.startTime,
		amount: t.amount,
		status: t.status,
		provider: t.provider,
	}));
}

async function getP2pTransactions() {
	const session = await getServerSession(authOptions);
	const p2pTxn = await prisma.p2pTransfer.findMany({
		where: {
			OR: [
				{ senderUserId: Number(session?.user?.id) },
				{ receiverUserId: Number(session?.user?.id) },
			],
		},
	});

	return p2pTxn;
}

const page = async () => {
	// const balance = await getBalance();
	const transactions = await getOnRampTransactions();
	const p2pTxn = await getP2pTransactions();
	console.log("p2p Txn", p2pTxn);
	const AllTxn = [...transactions, ...p2pTxn];

	return (
		<div className="w-screen">
			<div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
				All Transactions
			</div>
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
				<div className="pt-4">
					<OnRampTransactions transactions={AllTxn} title="All Transactions" />
				</div>
			</div>
		</div>
	);
};

export default page;
