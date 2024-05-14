import { Button } from "./button";

interface AppbarProps {
	user: any;
	onSignin: any;
	onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
	return (
		<div className="flex justify-between border-b px-20">
			<div className="text-2xl flex items-center font-extrabold text-[#008cff]">
				Netpe
			</div>
			<div className="flex items-center pt-2 ">
				<Button onClick={user ? onSignout : onSignin}>
					{user ? "Logout" : "Login"}
				</Button>
			</div>
		</div>
	);
};
