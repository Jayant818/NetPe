// Jo prisma client hai wo already added hai in the node_modules hum usko whi se use kar sakte hai directly from our app , but it is generally recommended that ki app yaha se hi export karo

// export * from "@prisma/client";

import { PrismaClient } from "@prisma/client";

const createInstance = () => {
	return new PrismaClient();
};

declare global {
	var prismaGlobal: null | ReturnType<typeof createInstance>;
}

const prisma: ReturnType<typeof createInstance> =
	globalThis.prismaGlobal || createInstance();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
