"use client";
import Center from "@repo/ui/Center.tsx";
import TextInput from "@repo/ui/TextInput.tsx";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";

import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard({ number }: { number?: string }) {
	const [num, setNumber] = useState(number || "");
	const [amount, setAmount] = useState("");

	return (
		<div className="h-[90vh]">
			<Center>
				<Card title="Send">
					<div className="min-w-72 pt-2">
						<TextInput
							placeholder={"Number"}
							label="Number"
							onChange={(value) => {
								setNumber(value);
							}}
							value={num}
						/>
						<TextInput
							placeholder={"Amount"}
							label="Amount"
							onChange={(value) => {
								setAmount(value);
							}}
						/>
						<div className="pt-4 flex justify-center">
							<Button
								onClick={async () => {
									await p2pTransfer(num, Number(amount) * 100);
									alert("Sent");
								}}
							>
								Send
							</Button>
						</div>
					</div>
				</Card>
			</Center>
		</div>
	);
}
