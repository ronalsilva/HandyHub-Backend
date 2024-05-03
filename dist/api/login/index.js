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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../services/client/user");
const hash_1 = require("../../utils/hash");
const loginSchema_1 = require("./schema/loginSchema");
const google_auth_library_1 = require("google-auth-library");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function userRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.post("/login", loginSchema_1.SchemaLogin, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            try {
                if (typeof email !== 'string' || typeof password !== 'string') {
                    return reply.code(400).send({ message: "Invalid email or password format" });
                }
                const user = yield (0, user_1.findUserByEmail)(email);
                if (!user || !(0, hash_1.verifyPassword)({ candidatePassword: password, salt: user.salt, hash: user.password })) {
                    return reply.code(401).send({ message: "Invalid email or password" });
                }
                const { id, name } = user, rest = __rest(user, ["id", "name"]);
                const accessToken = request.jwt.sign(rest);
                return { user: { id, name, email }, accessToken };
            }
            catch (e) {
                console.error("Error logging in:", e);
                return reply.code(500).send({ message: "Internal Server Error" });
            }
        }));
        server.post("/login/google", loginSchema_1.SchemaLoginGmail, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { googleToken } = request.body;
            const client = new google_auth_library_1.OAuth2Client({
                clientId: process.env.GOOGLE_ID || '',
                clientSecret: process.env.GOOGLE_SECRET || '',
            });
            try {
                if (typeof googleToken !== 'string') {
                    return reply.code(400).send({ message: "Invalid Google token format" });
                }
                const ticket = yield client.verifyIdToken({
                    idToken: googleToken,
                    audience: process.env.GOOGLE_ID || '',
                });
                const payload = ticket.getPayload();
                const emailFromGoogle = payload === null || payload === void 0 ? void 0 : payload.email;
                const user = yield (0, user_1.findUserByEmail)(emailFromGoogle);
                if (!user) {
                    console.log("Criar conta");
                }
            }
            catch (e) {
                console.error("Error logging in with Google:", e);
                return reply.code(500).send({ message: "Internal Server Error" });
            }
        }));
    });
}
exports.default = userRoutes;
