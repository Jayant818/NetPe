import { Card } from "@repo/ui/card";
import React from "react";

const OnRampTransactions = ({
	transactions,
}: {
	transactions: {
		time: Date;
		amount: number;
		//  can also declare a enum
		status: string;
		provider: string;
	}[];
}) => {
	if (!transactions.length) {
		return (
			<Card title="Recent Transactions">
				<div className="text-center pb-8 pt-8">No Recent Transations</div>
			</Card>
		);
	}
	return (
		<Card title="Recent Transactions">
			<div className="pt-2">
				{transactions.map((t) => (
					<div className="flex justify-between">
						<div>
							<div className="text-sm">Received INR</div>
							<div className="text-slate-600 text-sm">
								{t.time.toDateString()}
							</div>
						</div>
						<div className="flex flex-col justify-center">
							+ Rs {t.amount / 100}
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};

export default OnRampTransactions;