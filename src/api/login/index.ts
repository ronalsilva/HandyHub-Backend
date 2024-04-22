import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { findUserByEmail } from "../../services/user";
import { verifyPassword } from "../../utils/hash";
import { SchemaLogin} from './schema/loginSchema';

async function userRoutes(server: FastifyInstance) {
	server.post("/login", SchemaLogin, async (request: FastifyRequest<{ Body: typeof SchemaLogin.schema.body }>, reply: FastifyReply) => {
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
    });

    server.get('/auth/google', { schema: { tags: ['Login'], summary: 'Redirect login with Gmail' } }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const authorizationUri = server.googleOAuth2.authorizationUri;
    
            if (!authorizationUri) {
                throw new Error('Authorization URI not found');
            }
    
            reply.redirect(authorizationUri);
        } catch (error) {
            console.error("Error in Google OAuth2 redirect:", error);
            reply.code(500).send({ message: "Internal Server Error" });
        }
    });    

    server.get('/auth/callback', { schema: { tags: ['Login'], summary: 'Callback login with Gmail' } }, async (request: FastifyRequest<{ Querystring: { code: string } }>, reply: FastifyReply) => {
        const { code } = request.query;
        try {
          const token = await server.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow({
            code: code as string,
          });
    
          // Aqui você deve enviar a resposta com o token obtido
          reply.send({ token }); // Verifique se o token está sendo retornado corretamente
        } catch (error) {
          console.error("Error in Google OAuth2 callback:", error);
          reply.code(500).send({ message: "Internal Server Error" });
        }
    });
    
}

export default userRoutes;
