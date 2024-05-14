"use client";
import Select from "@repo/ui/Select.tsx";
import TextInput from "@repo/ui/TextInput.tsx";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import createOnRamptxn from "../app/lib/actions/createOnRamptxn";
// import db from "@repo/db/client";

const SUPPORTED_BANKS = [
	{
		name: "HDFC Bank",
		redirectUrl: "https://netbanking.hdfcbank.com",
	},
	{
		name: "Axis Bank",
		redirectUrl: "https://www.axisbank.com/",
	},
];

const AddMoneyCard = () => {
	const [redirectUrl, setRedirectUrl] = useState(
		SUPPORTED_BANKS[0]?.redirectUrl
	);
	const [Amount, setAmount] = useState(0);
	const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
	return (
		<Card title="Add Money">
			<div className="w-full">
				<TextInput
					label="Amount"
					placeholder="Amount"
					onChange={(value) => {
						setAmount(Number(value) * 100);
					}}
				/>
				<div className="py-4 text-left">Bank</div>
				<Select
					onSelect={(value) => {
						setRedirectUrl(
							SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
						);
						setProvider(
							SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
						);
					}}
					options={SUPPORTED_BANKS.map((bank) => ({
						key: bank.name,
						value: bank.name,
					}))}
				/>
				<div className="flex justify-center pt-4">
					<Button
						onClick={async () => {
							await createOnRamptxn(Amount, provider);

							// window.location.href = redirectUrl || "";
							window.open(redirectUrl || "", "_blank");
							alert("Money Received, Refresh!!!!!");
						}}
					>
						Add Money
					</Button>
				</div>
			</div>
		</Card>
	);
};

export default AddMoneyCard;
