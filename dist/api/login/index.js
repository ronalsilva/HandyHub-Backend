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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../services/user");
const hash_1 = require("../../utils/hash");
const loginSchema_1 = require("./schema/loginSchema");
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
        server.get('/auth/google', { schema: { tags: ['Login'], summary: 'Redirect login with Gmail' } }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authorizationUri = server.googleOAuth2.authorizationUri;
                if (!authorizationUri) {
                    throw new Error('Authorization URI not found');
                }
                reply.redirect(authorizationUri);
            }
            catch (error) {
                console.error("Error in Google OAuth2 redirect:", error);
                reply.code(500).send({ message: "Internal Server Error" });
            }
        }));
        server.get('/auth/callback', { schema: { tags: ['Login'], summary: 'Callback login with Gmail' } }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { code } = request.query;
            try {
                const token = yield server.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow({
                    code: code,
                });
                // Aqui você deve enviar a resposta com o token obtido
                reply.send({ token }); // Verifique se o token está sendo retornado corretamente
            }
            catch (error) {
                console.error("Error in Google OAuth2 callback:", error);
                reply.code(500).send({ message: "Internal Server Error" });
            }
        }));
    });
}
exports.default = userRoutes;
