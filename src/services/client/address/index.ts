import { Prisma } from "@prisma/client";
import prisma from "../../../utils/prisma";

export async function registerAddress(body: Prisma.AddressCreateInput) {
    const { address, city, province, postal_code, user } = body;
    let result;
    
    try {
        result = await prisma.address.create({
            data: {
                address,
                city,
                province,
                postal_code: postal_code,
                user_id: user
            }
        });
        
    } catch (error) {
        if(error instanceof Prisma.PrismaClientKnownRequestError) {
            return {
                code: 500,
                mensage: error
            }
        }
    }

    console.log(result)

    return result;
}

export async function updateAddress(body: any) {
    const { address, city, province, postalcode, id } = body;
	const data = {
		address,
        city,
        province,
        postalCode: postalcode
	}

    const addressUser = await prisma.address.update({
        where: { id },
        data
    });

    return addressUser;
}