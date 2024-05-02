import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";

export async function createUser(body: any) {
    const { password, firstName, lastName, email } = body;
	const data = {
		name: `${firstName} ${lastName}`,
		email: email,
	}

    const { hash, salt } = hashPassword(password);
    const user = await prisma.user.create({
        data: { ...data, salt, password: hash },
    });

    return user;
}

export async function findUserByEmail(email: string) {
	let result =  prisma.user.findUnique({
		where: {
			email,
		},
	});
	
	return result;
}

export async function findUserById(id: number) {
	let result = await prisma.user.findUnique({
		where: {
			id: id,
		},
	});
	
	return result;
}
