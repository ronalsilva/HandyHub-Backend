import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUser, findUserById } from "../../services/user";
import { SchemaUser, SchemaSaerchUser} from './schema/userSchema';

async function userRoutes(server: FastifyInstance) {
    server.post("/create", SchemaUser, async (request: FastifyRequest<{ Body: typeof SchemaUser.schema.body }>, reply: FastifyReply) => {
        const body = request.body;

        try {
            const user = await createUser(body);

            return reply.code(201).send(user);
        } catch (e) {
            console.error("Error creating user:", e);
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
