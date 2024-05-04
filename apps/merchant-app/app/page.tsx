import { Button } from "@repo/ui/button";

export default function Home() {
	return (
		<div className="text-4xl">
			Hi There{" "}
			<Button className="text-4xl" appName="Merchant">
				Hello Bhaiyo
			</Button>
		</div>
	);
}
