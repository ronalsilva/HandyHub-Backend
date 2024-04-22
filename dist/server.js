"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const fastify_1 = __importDefault(require("fastify"));
const fastify_jwt_1 = __importDefault(require("fastify-jwt"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const fastify_zod_1 = require("fastify-zod");
const dotenv_1 = __importDefault(require("dotenv"));
// import userRoutes from "./controllers/user";
// import eventsRoutes from "./controllers/events";
dotenv_1.default.config();
function buildServer() {
    var _a;
    const server = (0, fastify_1.default)();
    server.register(fastify_jwt_1.default, {
        secret: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : process.exit(1),
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
    }));
    // server.register(userRoutes, { prefix: "api/users" });
    // server.register(eventsRoutes, { prefix: "api/events" });
    const controllerPath = path.join(__dirname, "controllers");
    const controllers = fs.readdirSync(controllerPath);
    controllers.forEach(controller => {
        const controllerRoutes = require(path.join(controllerPath, controller)).default;
        server.register(controllerRoutes, { prefix: `api/${controller.toLowerCase()}` });
    });
    return server;
}
exports.default = buildServer;
