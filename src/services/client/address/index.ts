import prisma from "../../../utils/prisma";

export async function registerAddress(body: any) {
    const { address, city, province, postalcode, userid } = body;
	const data = {
		address,
        city,
        province,
        postalCode: postalcode,
        userId: userid
	}

    const addressUser = await prisma.address.create({
        data
    });

    return addressUser;
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