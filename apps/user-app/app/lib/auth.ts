import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { pages } from "next/dist/build/templates/app-page";

const randomNum1 = Math.random() * 100 + 1;
const randomNum2 = Math.random() * 800 + 1;

const randNum = Math.floor(randomNum1 + randomNum2);

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				phone: {
					label: "Phone Number",
					type: "text",
					placeholder: "Enter your phone number",
					required: true,
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "Enter your password",
					required: true,
				},
			},
			async authorize(credentials: any) {
				const hashedPassword = await bcrypt.hash(credentials.password, 10);
				console.log("hanshed password", hashedPassword);
				const existingUser = await db.user.findFirst({
					where: {
						number: credentials.phone,
					},
				});

				console.log("existing user", existingUser);

				if (existingUser) {
					// compare the passwords
					const passwordValidation = await bcrypt.compare(
						credentials.password,
						existingUser.password
					);
					if (passwordValidation) {
						return {
							id: existingUser.id.toString(),
							name: existingUser.name,
							email: existingUser.email,
							number: existingUser.number,
						};
					} else {
						console.log("result", passwordValidation);
						return null;
					}
				}
				try {
					const newUser = await db.user.create({
						data: {
							number: credentials.phone,
							password: hashedPassword,
							name: credentials.name,
							email: credentials.email,
							Balance: {
								create: {
									amount: 1000000,
									locked: 0,
								},
							},
							OnRampTransaction: {
								create: {
									startTime: new Date(),
									status: "SUCCESS",
									amount: 1000000,
									token: randNum.toString(),
									provider: "HDFC Bank",
								},
							},
						},
					});

					return {
						id: newUser.id.toString(),
						name: newUser.name,
						email: newUser.email,
						number: newUser.number,
					};
				} catch (e) {
					console.log(e);
				}
				return null;
			},
		}),
	],
	secret: process.env.JWT_SECRET || "secret",
	callbacks: {
		async session({ token, session }: any) {
			session.user.id = token.sub;
			return session;
		},
	},
	pages: {
		signIn: "/Login",
	},
};
