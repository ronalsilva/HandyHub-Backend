
import * as fs from "fs";
import * as path from "path";
import env from "dotenv";
import Fastify, { FastifyRequest, FastifyReply, FastifyPluginAsync, FastifyInstance } from "fastify";
import fjwt, { JWT } from "@fastify/jwt";
import fastifySwagger  from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyOAuth2 from '@fastify/oauth2'; 

env.config();

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    googleOAuth2: GoogleOAuth2Provider;
    authenticate: any;
  }
}

interface GoogleOAuth2Provider {
  authorizationUri: string;
  getAccessTokenFromAuthorizationCodeFlow(options: { code: string }): Promise<string>;
}

const swaggerOptions = {
  swagger: {
    info: {
      title: "HandyHub APIs",
      description: "",
      version: "1.0.0",
    },
    tags: [{ name: "Default", description: "Default" }],
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'apiKey',
        in: 'header'
      }
    }
  },
};

const swaggerUiOptions = {
  routePrefix: "/swagger",
  exposeRoute: true,
  staticCSP: true,
};

function buildServer(): FastifyInstance {
  const server = Fastify();

  server.register(fjwt, {
    secret: process.env.JWT_SECRET || "",
  });

  server.register(fastifyOAuth2, {
    name: 'googleOAuth2',
    credentials: {
      client: {
        id: process.env.GOOGLE_ID || "",
        secret: process.env.GOOGLE_SECRET || "",
      },
      auth: fastifyOAuth2.GOOGLE_CONFIGURATION,
    },
    scope: ['profile', 'email'],
    startRedirectPath: '/auth/google',
    callbackUri: '/auth/callback',
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        reply.send(e);
      }
    }
  );

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt as JWT;
    next();
  });

  server.register(fastifySwagger, swaggerOptions);
  server.register(fastifySwaggerUi, swaggerUiOptions);

  const apiPath = path.join(__dirname, "api");
  const apis = fs.readdirSync(apiPath);
  
  apis.forEach(api => {
    const apiRoutes: FastifyPluginAsync = require(path.join(apiPath, api)).default;
    server.register(apiRoutes, { prefix: `api/${api.toLowerCase()}` });
  });
 
  return server;
}

export default buildServer;