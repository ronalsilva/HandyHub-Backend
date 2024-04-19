
import * as fs from "fs";
import * as path from "path";
import Fastify, { FastifyRequest, FastifyReply, FastifyPluginAsync } from "fastify";
import fjwt, { JWT } from "fastify-jwt";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod";
import env from "dotenv";

env.config();

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "fastify-jwt" {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

function buildServer() {
  const server = Fastify();

  server.register(fjwt, {
    secret: process.env.JWT_SECRET?? process.exit(1),
  });

  server.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (e) {
        return reply.send(e);
      }
    }
  );

  server.get("/healthcheck", async function () {
    return { status: "OK" };
  });

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  server.register(
    swagger,
    withRefResolver({
      routePrefix: "/swagger",
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: "HandyHub APIs",
          description: "HandyHub's development API, materia is still in Beta version",
          version: '0.0.1',
        },
        components: {
          securitySchemes: {
            apiKey: {
              type: 'apiKey',
              name: 'authorization',
              in: 'header'
            }
          }
        }
      },
    })
  );

  const apiPath = path.join(__dirname, "api");
  const apis = fs.readdirSync(apiPath);
  
  apis.forEach(api => {
    const apiRoutes: FastifyPluginAsync = require(path.join(apiPath, api)).default;
    server.register(apiRoutes, { prefix: `api/${api.toLowerCase()}` });
  });
 
  return server;
}

export default buildServer;
