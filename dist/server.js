"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const dotenv_1 = __importDefault(require("dotenv"));
const fastify_1 = __importDefault(require("fastify"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const oauth2_1 = __importDefault(require("@fastify/oauth2"));
dotenv_1.default.config();
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
function buildServer() {
    const server = (0, fastify_1.default)();
    server.register(jwt_1.default, {
        secret: process.env.JWT_SECRET || "",
    });
    server.register(oauth2_1.default, {
        name: 'googleOAuth2',
        credentials: {
            client: {
                id: process.env.GOOGLE_ID || "",
                secret: process.env.GOOGLE_SECRET || "",
            },
            auth: oauth2_1.default.GOOGLE_CONFIGURATION,
        },
        scope: ['profile', 'email'],
        startRedirectPath: '/auth/google',
        callbackUri: '/auth/callback',
    });
    server.decorate("authenticate", (request, reply) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield request.jwtVerify();
        }
        catch (e) {
            reply.send(e);
        }
    }));
    server.get("/healthcheck", function () {
        return __awaiter(this, void 0, void 0, function* () {
            return { status: "OK" };
        });
    });
    server.addHook("preHandler", (req, reply, next) => {
        req.jwt = server.jwt;
        next();
    });
    server.register(swagger_1.default, swaggerOptions);
    server.register(swagger_ui_1.default, swaggerUiOptions);
    const apiPath = path.join(__dirname, "api");
    const apis = fs.readdirSync(apiPath);
    apis.forEach(api => {
        const apiRoutes = require(path.join(apiPath, api)).default;
        server.register(apiRoutes, { prefix: `api/${api.toLowerCase()}` });
    });
    return server;
}
exports.default = buildServer;
