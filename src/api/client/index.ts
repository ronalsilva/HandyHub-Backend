import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUser, findUserById } from "../../services/client/user";
import { registerAddress, updateAddress } from "../../services/client/address";
import { SchemaUser, SchemaSaerchUser, SchemaCreateAddress, SchemaUpdateAddress} from './schema/userSchema';
import { Prisma } from "@prisma/client";

async function userRoutes(server: FastifyInstance) {
    server.post("/create", SchemaUser, async (request: FastifyRequest<{ Body: typeof SchemaUser.schema.body }>, reply: FastifyReply) => {
        const body:any = request.body;

        const userData = body.user;
        const userAddress = body.address;

        const user = await createUser(userData);

        if(user.code === 400) {
            return reply.code(user.code).send(user);
        }

        const address = await registerAddress({ ...userAddress, user: user.id });

        return reply.send({user, address});
    });

    server.post("/address", SchemaCreateAddress, async (request: FastifyRequest<{ Body: typeof SchemaCreateAddress.schema.body }>, reply: FastifyReply) => {
        const body:any = request.body;

        try {
            const user = await registerAddress(body);

            return reply.code(201).send(user);
        } catch (e) {
            console.error("Error creating address:", e);
            return reply.code(500).send({ message: "Internal Server Error" });
        }
    });

    server.put("/address", SchemaUpdateAddress, async (request: FastifyRequest<{ Body: typeof SchemaUpdateAddress.schema.body }>, reply: FastifyReply) => {
        const body = request.body;

        try {
            const user = await updateAddress(body);

            return reply.code(201).send(user);
        } catch (e) {
            console.error("Error creating address:", e);
            return reply.code(500).send({ message: "Internal Server Error" });
        }
    });

    server.get("/:id", { preHandler: [server.authenticate], ...SchemaSaerchUser }, async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
        const { id } = request.params;

        try {
            const user = await findUserById(Number(id));
            if (!user) {
                return reply.code(404).send({ code: 404, message: `User with ID: ${id} was not found` });
            }
            return user;
        } catch (e) {
            console.error("Error searching user:", e);
            return reply.code(500).send({ message: "Internal Server Error" });
        }
    
    });
}

export default userRoutes;
