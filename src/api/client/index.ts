import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUser, findUserById } from "../../services/client/user";
import { registerAddress, updateAddress } from "../../services/client/address";
import { SchemaUser, SchemaSaerchUser, SchemaCreateAddress, SchemaUpdateAddress} from './schema/userSchema';

async function userRoutes(server: FastifyInstance) {
    server.post("/create", SchemaUser, async (request: FastifyRequest<{ Body: typeof SchemaUser.schema.body }>, reply: FastifyReply) => {
        const body = request.body;

        try {
            const user = await createUser(body);

            return reply.code(201).send(user);
        } catch (e:any) {

            if(e.code === "ERR_INVALID_ARG_TYPE") {
                return reply.code(400).send({ message: e.message })
            }
            console.error("Error creating user:", e);
            return reply.code(500).send({ message: "Internal error" });
        }
    });

    server.post("/address", SchemaCreateAddress, async (request: FastifyRequest<{ Body: typeof SchemaCreateAddress.schema.body }>, reply: FastifyReply) => {
        const body = request.body;

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
