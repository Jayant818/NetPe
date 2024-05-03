import { PrismaClient } from "@repo/db/client";

const client = new PrismaClient();

export default function Page(): JSX.Element {
	return <div className="text-4xl text-black">HI There</div>;
}
