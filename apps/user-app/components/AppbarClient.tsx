"use client";
import { Appbar } from "@repo/ui/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AppBarClient = () => {
	const router = useRouter();
	const session = useSession();
	return (
		<Appbar
			onSignin={signIn}
			onSignout={async () => {
				await signOut();
				router.push("/api/auth/signin");
			}}
			user={session.data?.user}
		/>
	);
};

export default AppBarClient;
