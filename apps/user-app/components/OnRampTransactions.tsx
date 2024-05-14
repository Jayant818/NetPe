import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../app/lib/auth";

const OnRampTransactions = async ({
	transactions,
	title,
}: {
	transactions: {
		time?: Date;
		amount: number;
		status?: string;
		provider?: string;
		timestamp?: Date;
		senderUserId?: number;
		receiverUserId?: number;
		id?: number;
	}[];
	title: string;
}) => {
	const session = await getServerSession(authOptions);

	if (!transactions.length) {
		return (
			<Card title={title}>
				<div className="text-center pb-8 pt-8">
					{title === "Recent Transactions"
						? "No Recent Transactions"
						: "No Transactions"}
				</div>
			</Card>
		);
	}

	return (
		<Card title={title}>
			<div className="pt-2">
				{transactions.map((t) =>
					// Check if status exists and is "FAILED"
					t.status && t.status === "FAILED" ? null : (
						<div key={t.id} className="flex justify-between">
							<div>
								<div className="text-sm">
									{t.time
										? "Received INR"
										: Number(session?.user?.id) === t.senderUserId
											? "Sent INR"
											: "Received INR"}
								</div>
								<div className="text-slate-600 text-sm">
									{t.time?.toDateString() || t.timestamp?.toDateString()}
								</div>
							</div>
							<div className="flex flex-col justify-center">
								{Number(session?.user?.id) === t.senderUserId ? "-" : "+"}
								{t.amount / 100}
							</div>
						</div>
					)
				)}
			</div>
		</Card>
	);
};

export default OnRampTransactions;
