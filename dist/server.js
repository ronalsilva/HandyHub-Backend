"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const fastify_jwt_1 = __importDefault(require("fastify-jwt"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const fastify_zod_1 = require("fastify-zod");
const user_1 = __importDefault(require("./controllers/user"));
const events_1 = __importDefault(require("./controllers/events"));
function buildServer() {
    const server = (0, fastify_1.default)();
    server.register(fastify_jwt_1.default, {
        secret: "ndkandnan78duy9sau87dbndsa89u7dsy789adb",
    });
    server.decorate("authenticate", (request, reply) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield request.jwtVerify();
        }
        catch (e) {
            return reply.send(e);
        }
    }));
    server.get("/healthcheck", function () {
        return __awaiter(this, void 0, void 0, function* () {
            return { status: "OK" };
        });
    });
    server.addHook("preHandler", (req, reply, next) => {
        req.jwt = server.jwt;
        return next();
    });
    server.register(fastify_swagger_1.default, (0, fastify_zod_1.withRefResolver)({
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
                        name: 'authenticate',
                        in: 'header'
                    }
                }
            }
        },
    }));
    server.register(user_1.default, { prefix: "api/users" });
    server.register(events_1.default, { prefix: "api/events" });
    return server;
}
exports.default = buildServer;
