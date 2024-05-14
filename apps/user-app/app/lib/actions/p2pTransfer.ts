"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
	// get the sender ID
	const session = await getServerSession(authOptions);
	const senderId = session?.user?.id;

	if (!senderId) {
		return {
			message: "Error while sending",
		};
	}

	// get the receiver id from phn number

	const receiver = await prisma.user.findFirst({
		where: {
			number: to,
		},
	});

	const receiverId = receiver?.id;

	if (!receiverId) {
		return {
			message: "User not found",
		};
	}

	// Do the operations in a txn

	await prisma.$transaction(async (tx) => {
		// Update locks the txn
		// prisma doesn't provide lock functionality so we have to it this way using raw query
		//
		await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(senderId)} FOR UPDATE`;
		// get the senderBalance
		const senderBalance = await tx.balance.findUnique({
			where: {
				userId: Number(senderId),
			},
		});

		// delay function
		// await new Promise((r) => setTimeout(r, 4000));

		if (!senderBalance || senderBalance.amount < amount) {
			throw new Error("Insufficient Balance");
		}

		await tx.balance.update({
			where: {
				userId: Number(senderId),
			},
			data: {
				amount: {
					decrement: amount,
				},
			},
		});

		await tx.balance.update({
			where: {
				userId: receiverId,
			},
			data: {
				amount: {
					increment: amount,
				},
			},
		});

		await tx.p2pTransfer.create({
			data: {
				amount,
				senderUserId: Number(senderId),
				receiverUserId: receiverId,
				timestamp: new Date(),
			},
		});
	});
}
