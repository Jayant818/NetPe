import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
	const alice = await prisma.user.update({
		where: { number: "9711177191" },
		data: {
			name: "Jayant",
			OnRampTransaction: {
				create: {
					startTime: new Date(),
					status: "SUCCESS",
					amount: 40000,
					token: "444",
					provider: "HDFC Bank",
				},
			},
			Balance: {
				create: {
					amount: 20000,
					locked: 0,
				},
			},
		},
	});
	// const bob = await prisma.user.upsert({
	// 	where: { number: "8888888889" },
	// 	update: {},
	// 	create: {
	// 		number: "8888888889",
	// 		password: await bcrypt.hash("Monu", 10),
	// 		name: "Monu",
	// 		OnRampTransaction: {
	// 			create: {
	// 				startTime: new Date(),
	// 				status: "FAILED",
	// 				amount: 2000,
	// 				token: "336",
	// 				provider: "HDFC Bank",
	// 			},
	// 		},
	// 		Balance: {
	// 			create: {
	// 				amount: 4000,
	// 				locked: 0,
	// 			},
	// 		},
	// 	},
	// });
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
