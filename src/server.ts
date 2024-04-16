import Fastify, { FastifyRequest, FastifyReply } from "fastify";
import fjwt, { JWT } from "fastify-jwt";
import swagger from "fastify-swagger";
import { withRefResolver } from "fastify-zod";
import userRoutes from "./controllers/user";
import eventsRoutes from "./controllers/events";

import * as fs from "fs";
import * as path from "path";
import { FastifyPluginAsync } from 'fastify';

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
    secret: "5d64e1aa9eff6d100cb0297255fe991082e0fb20418ed8d065a556f328bfbccb",
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
          description: "",
          version: '1.0.0',
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

  // server.register(userRoutes, { prefix: "api/users" });
  // server.register(eventsRoutes, { prefix: "api/events" });

  const controllerPath = path.join(__dirname, "controllers");
  const controllers = fs.readdirSync(controllerPath);
  
  controllers.forEach(controller => {
    const controllerRoutes: FastifyPluginAsync = require(path.join(controllerPath, controller)).default;
    console.log('router')
    console.log(controllerRoutes)
    server.register(controllerRoutes, { prefix: `api/${controller.toLowerCase()}` });
  });
 
  return server;
}

export default buildServer;
