import { Prisma } from "@prisma/client";
import { hashPassword } from "../../../utils/hash";
import prisma from "../../../utils/prisma";

export async function createUser(body: Prisma.UserCreateInput): Promise<any> {
    const { password, first_name, last_name, email } = body;

    const { hash, salt } = hashPassword(password);

    try {
        const user = await prisma.user.create({
            data: { first_name, last_name, email, salt, password: hash },
            select: { id: true, first_name: true, last_name: true, email: true }
        });

        return user;
    } catch (error:any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return { 
                code: 400, 
                error: "BAD_REQUREST",
                message: `the ${error.meta?.target || ''} field already exist` 
            };
        }

        console.error("Erro ao criar usuário:", error);
        return { code: 500, message: "Ocorreu um erro ao criar o usuário." };
    }
}

export async function findUserByEmail(email: string): Promise<any>  {
    return prisma.user.findUnique({
        where: {
            email,
        },
        // select: { email: true, first_name: true, last_name: true, id: true }
    });
}

export async function findUserById(id: number): Promise<any>  {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
}
