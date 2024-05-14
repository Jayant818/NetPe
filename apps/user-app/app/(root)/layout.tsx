import AppBarClient from "../../components/AppbarClient";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<AppBarClient />
			<div>{children}</div>
		</main>
	);
}
