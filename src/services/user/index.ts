import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";

export async function createUser(input: any) {
    const { password } = input;
	const data = {
		name: `${input.firstName} ${input.lastName}`,
		email: input.email,
	}

    const { hash, salt } = hashPassword(password);
    const user = await prisma.user.create({
        data: { ...data, salt, password: hash },
    });

    return user;
}

export async function findUserByEmail(email: string) {
	return prisma.user.findUnique({
		where: {
			email,
		},
	});
}

export async function findUserById(id: number) {
	let result = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});
	
	return result;
}
