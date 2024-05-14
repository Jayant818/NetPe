import { SendCard } from "../../../../components/SendCard";

export default function ({
	searchParams,
}: {
	searchParams: { number: string };
}) {
	// console.log("Parameter", searchParams);

	return (
		<div className="w-full">
			<SendCard number={searchParams.number} />
		</div>
	);
}
