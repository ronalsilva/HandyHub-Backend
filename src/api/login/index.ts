import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { findUserByEmail } from "../../services/client/user";
import { verifyPassword } from "../../utils/hash";
import { SchemaLogin, SchemaLoginGmail} from './schema/loginSchema';
import { OAuth2Client } from 'google-auth-library';
import env from "dotenv";
env.config();

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

    server.post("/login/google", SchemaLoginGmail, async (request: FastifyRequest<{ Body: typeof SchemaLoginGmail.schema.body }>, reply: FastifyReply) => {
        const { googleToken } = request.body;

        const client = new OAuth2Client({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        });

        try {
            if (typeof googleToken !== 'string') {
                return reply.code(400).send({ message: "Invalid Google token format" });
            }

            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_ID || '',
            });

            const payload = ticket.getPayload();
            const emailFromGoogle:any = payload?.email;

            const user = await findUserByEmail(emailFromGoogle);
            if (!user) {
                console.log("Criar conta")
            }
        } catch (e) {
            console.error("Error logging in with Google:", e);
            return reply.code(500).send({ message: "Internal Server Error" });
        }
    });
}

export default userRoutes;
