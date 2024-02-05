import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { getEvents } from "../../services/events";
import { ResponseEventSchema, RequestEventSchema } from './schema/eventSchema'
async function eventsRoutes(server: FastifyInstance) {
	server.get(
		"/events/:country",
		{
			schema: {
                params: RequestEventSchema,
                response: {
                    200: ResponseEventSchema
                },

			},
		},
        async (request: FastifyRequest, reply: FastifyReply) => {
            try {
                const params:any = request.params;
                
                const events = await getEvents(params.country);
                reply.send(events);
            } catch (err:any) {
                reply.status(err.response?.status || 500).send({ error: err.message });
            }
        }
	);
}

export default eventsRoutes;
