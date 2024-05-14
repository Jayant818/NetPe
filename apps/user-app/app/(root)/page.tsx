// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "../lib/auth";

export default async function Page() {
	const session = await getServerSession(authOptions);

	return (
		<section className="mt-6 ">
			<div className="px-20 relative">
				<div className="bg-[#deefff] rounded-xl w-[82%] pl-32 pb-24 flex justify-center  flex-col h-[80vh] gap-6">
					<h1 className="text-7xl font-bold  ">
						Fast, safe <br />
						social
						<br />
						payments
					</h1>
					<p className="text-lg ">
						Pay,get paid, grow a business, and more. Join
						<br /> the tens of millions of people on Venmo
					</p>
					{!session?.user && (
						<div className="relative bg-[#bd7fe6] w-[118px] h-[44px]  rounded-full hover:bg-transparent">
							<button className="bg-[#008cff] text-white font-extrabold  px-8 py-2 rounded-full  absolute top-[-4px] left-[-4px] ">
								<Link href="/Login">Log in</Link>
								{/* {!session?.user ? (
								<>
									<Link href="/Login">Log in</Link>
								</>
							) : (
								<>
									{/* <div
										onClick={() => {
											signOut();
										}}
									>
										Log Out
									</div> */}
								{/* </>
							)} */}
							</button>
						</div>
					)}
				</div>
				<div className="absolute top-[20%] left-[50%]">
					<Image
						src="/home-hero.webp"
						width={700}
						height={515}
						alt="netpe hero section image"
					/>
				</div>
			</div>
		</section>
	);
}
