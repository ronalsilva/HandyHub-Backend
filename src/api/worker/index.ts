import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { findUserById } from "../../services/user";

async function userRoutes(server: FastifyInstance) {
    server.get("/:id", { schema: { tags: ['Worker'], summary: 'Redirect login with Gmail' } }, async (request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply) => {
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
