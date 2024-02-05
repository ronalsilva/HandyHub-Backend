import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { createUser, findUserByEmail, findUserById } from "../../services/user";
import { verifyPassword } from "../../utils/hash";
import { ResponseUser, RequestUser, RequestUserLogin } from './schema/userSchema';
import AuthMidleware from '../../utils/authMidleware';

async function userRoutes(server: FastifyInstance) {
	server.post(
		"/create",
		{
			schema: {
				tags: ['User'],
				summary: 'Create a new user',
				// security: [{ apiKey: [AuthMidleware] }],
				body: RequestUser,
				response: {
					201: ResponseUser,
				},
			},
			onRequest: [AuthMidleware]
			// preHandler: [server.authenticate],
		},
		async (request: FastifyRequest< { Body: any } >, reply: FastifyReply) => {
			const body = request.body;

			try {
				const user = await createUser(body);
		
				return reply.code(201).send(user);
			} catch (e) {
				console.log(e);
				return reply.code(500).send(e);
			}
        }
	);

	server.post(
		"/login",
		{
			schema: {
				tags: ['User'],
				summary: 'Login user',
				body: RequestUserLogin,
				response: {
					200: { accessToken: { type: 'string'} },
				},
			},
		},
		async (request: FastifyRequest< { Body: any } >, reply: FastifyReply) => {
			const body = request.body;
			const user = await findUserByEmail(body.email);
		
			if (!user) {
				return reply.code(401).send({ message: "Invalid email or password" });
			}

			const correctPassword = verifyPassword({
				candidatePassword: body.password,
				salt: user.salt,
				hash: user.password,
			});
		
			if (correctPassword) {
				const { password, salt, ...rest } = user;
				return { accessToken: request.jwt.sign(rest) };
			}
			return reply.code(401).send({
				message: "Invalid email or password",
			});
        }
	);

	server.get(
		"/:id",
		{
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
		async (request: FastifyRequest, reply: FastifyReply) => {
			const params:any = request.params;

			const user = await findUserById(params.id);

			if(!user) {
				return reply.code(404).send({
					code: 404,
					message: `User with ID: ${params.id} was not found`,
				});
			}
			
			return user;
        }
	);
}

export default userRoutes;
