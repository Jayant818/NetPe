import express from "express";
import db from "@repo/db/client";

const app = express();

// converts json string into json object or we can do it ourself using json.parse
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
	//TODO: Add zod validation here?
	//TODO:HDFC BANK should also sent a secret key to verify it is sent by them
	const paymentInformation: {
		token: string;
		userId: string;
		amount: string;
	} = {
		token: req.body.token,
		userId: req.body.user_identifier,
		amount: req.body.amount,
	};

	//ab hame txn use karni padegi taki agar ho to one go mai ho jaye
	try {
		const txn = db.onRampTransaction.findUnique({
			where: {
				token: paymentInformation.token,
			},
		});

		console.log("TXN", txn);
		// if (txn.status === "PROCESSING")
		await db.$transaction([
			//1) update balance in balance table
			//2) update status in the OnRamp Table

			// we can also do this other way
			// means , getting the user first using findFirst, then updating it
			// why to use the increment method
			// kyoki maan lo 2 request simutaneously aayi
			// user -1 , add 200
			// user -1 , add 400
			// so using above method the final balance will be 400 not 600.

			db.balance.update({
				where: {
					userId: Number(paymentInformation.userId),
				},
				data: {
					amount: {
						increment: Number(paymentInformation.amount),
					},
				},
			}),

			db.onRampTransaction.update({
				where: {
					token: paymentInformation.token,
				},
				data: {
					status: "SUCCESS",
				},
			}),
		]);

		// ye jaiyegi to hdfc bank taki unko pata chale ki payment successfull hua hai
		res.json({
			message: "Captured the payment successfully",
		});
	} catch (e) {
		res.status(411).json({
			message: "Datbase is Down",
		});
	}
	// Update balance in db, add txn
});

app.get("/", (req, res) => {
	return res.json({
		message: "Bank Webhook Handler",
	});
});

app.listen(3003, () => {
	console.log("Server is running at port 3003");
});
