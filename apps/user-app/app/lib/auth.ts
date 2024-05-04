import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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

				if (existingUser) {
					// compare the passwords
					const passwordValidation = await bcrypt.compare(
						hashedPassword,
						existingUser.password
					);
					if (passwordValidation) {
						return {
							id: existingUser.id.toString(),
							name: existingUser.name,
							email: existingUser.number,
						};
					} else {
						return null;
					}
				}
				try {
					const newUser = await db.user.create({
						data: {
							number: credentials.phone,
							password: hashedPassword,
						},
					});

					return {
						id: newUser.id.toString(),
						name: newUser.name,
						email: newUser.number,
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
};
