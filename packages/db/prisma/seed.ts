import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
	const Monu = await prisma.user.upsert({
		where: { number: "8888888889" },
		update: {},
		create: {
			number: "8888888889",
			password: await bcrypt.hash("Monu", 10),
			name: "Monu",
			OnRampTransaction: {
				create: {
					startTime: new Date(),
					status: "FAILED",
					amount: 2000,
					token: "336",
					provider: "HDFC Bank",
				},
			},
			Balance: {
				create: {
					amount: 4000,
					locked: 0,
				},
			},
			// p2pTransfer: {
			// 	create: {
			// 		amount: 2000,
			// 		receiverUserId: 1,
			// 		senderUserId: 2,
			// 	},
			// },
		},
	});
	const sonu = await prisma.user.upsert({
		where: { number: "8888888888" },
		update: {},
		create: {
			number: "8888888888",
			password: await bcrypt.hash("Sonu", 10),
			name: "Sonu",
			OnRampTransaction: {
				create: {
					startTime: new Date(),
					status: "SUCCESS",
					amount: 8000,
					token: "337",
					provider: "HDFC Bank",
				},
			},
			Balance: {
				create: {
					amount: 4000,
					locked: 0,
				},
			},
			// p2pTransfer: {
			// 	create: {
			// 		amount: 2000,
			// 		receiverUserId: 2,
			// 		senderUserId: 1,
			// 	},
			// },
		},
	});
	// console.log({ alice, bob });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
