import { Prisma } from "@prisma/client";
import { hashPassword } from "../../../utils/hash";
import prisma from "../../../utils/prisma";

export async function createUser(body: Prisma.UserUncheckedCreateInput): Promise<any> {
    const { password, firstName, lastName, email } = body;
    let result;
    const data = {
        name: `${firstName} ${lastName}`,
        email: email,
    }
    
    const { hash, salt } = hashPassword(password);

    try {
        result = await prisma.user.create({
            data: { ...data, salt, password: hash },
        });
        
    } catch (error:any) {
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
            if(error.code === 'P2002') {
                console.log(error)
            }
        }
    }

    return result;
}

export async function findUserByEmail(email: string): Promise<any>  {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
}

export async function findUserById(id: number): Promise<any>  {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
}
