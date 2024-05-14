import { getServerSession } from "next-auth";
import {
	HomeIcon,
	P2PTransferIcon,
	TransactionsIcon,
	TransferIcon,
} from "../../../components/Icons/icons";
import { SidebarItem } from "../../../components/SidebarItem";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		redirect("/");
	}
	return (
		<div className="flex h-[92.5vh]">
			<div className="w-72 border-r border-slate-300 min-h-[100%] mr-4 pt-28">
				<div>
					<SidebarItem href={"/dashboard"} icon={<HomeIcon />} title="Home" />
					<SidebarItem
						href={"/transfer"}
						icon={<TransferIcon />}
						title="Transfer"
					/>
					<SidebarItem
						href={"/transactions"}
						icon={<TransactionsIcon />}
						title="Transactions"
					/>
					<SidebarItem
						href={"/p2p"}
						icon={<P2PTransferIcon />}
						title="P2P Transfer"
					/>
				</div>
			</div>
			{children}
		</div>
	);
}
