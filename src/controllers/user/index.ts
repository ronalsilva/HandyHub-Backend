import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUser, findUserByEmail, findUserById } from "../../services/user";
import { verifyPassword } from "../../utils/hash";
import { ResponseUser, RequestUser, RequestUserLogin, ResponseUserLogin } from './schema/userSchema';

async function userRoutes(server: FastifyInstance) {
    server.post(
        "/create",
        {
            schema: {
                tags: ['User'],
                summary: 'Create a new user',
                body: RequestUser,
                response: {
                    201: ResponseUser,
                },
            },
        },
        async (request: FastifyRequest<{ Body: typeof RequestUser }>, reply: FastifyReply) => {
            const body = request.body;

            try {
                const user = await createUser(body);

                return reply.code(201).send(user);
            } catch (e) {
                console.error("Error creating user:", e);
                return reply.code(500).send({ message: "Internal Server Error" });
            }
        }
    );

	server.post(
		"/login",
		{
			schema: {
				tags: ['User'],
				summary: 'Login user',
				body: { ...RequestUserLogin },
				response: {
					200: ResponseUserLogin,
				},
			},
		},
		async (request: FastifyRequest<{ Body: typeof RequestUserLogin }>, reply: FastifyReply) => {
			const { email, password } = request.body;
	
			try {
				if (typeof email !== 'string' || typeof password !== 'string') {
					return reply.code(400).send({ message: "Invalid email or password format" });
				}
	
				const user = await findUserByEmail(email);
	
				if (!user || !verifyPassword({ candidatePassword: password, salt: user.salt, hash: user.password })) {
					return reply.code(401).send({ message: "Invalid email or password" });
				}
	
				const { id, name, ...rest } = user;
				const accessToken = request.jwt.sign(rest);
	
				return { user: { id, name, email }, accessToken };
			} catch (e) {
				console.error("Error logging in:", e);
				return reply.code(500).send({ message: "Internal Server Error" });
			}
		}
	);

    server.get(
        "/:id",
        {
            preHandler: [server.authenticate],
            schema: {
                tags: ['User'],
                summary: 'Search user',
                params: {
                    id: { type: 'number' }
                },
                response: {
                    200: ResponseUser,
                },
            },
        },
        async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
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
        }
    );
}

export default userRoutes;
