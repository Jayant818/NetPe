"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export default async function createOnRamptxn(
	amount: number,
	provider: string
) {
	// get the user Id from the session , ab humse argument se nhi li taki koi usko manipulate na kar sake
	const session = await getServerSession(authOptions);

	const userId = session.user.id;

	if (!userId) {
		throw new Error("User not found in session");
	}

	const token = Math.floor(Math.random() * 1000).toString();

	// create the onRampTxn
	await prisma.onRampTransaction.create({
		data: {
			amount,
			provider,
			startTime: new Date(),
			status: "SUCCESS",
			// status: "PROCESSING",
			token,
			userId: Number(userId),
		},
	});
	// SKIPPING WEBHOOK PART
	await prisma.balance.update({
		where: {
			id: Number(userId),
		},
		data: {
			amount: {
				increment: amount,
			},
		},
	});
}
