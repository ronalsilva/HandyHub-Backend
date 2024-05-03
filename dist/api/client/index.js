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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../services/client/user");
const address_1 = require("../../services/client/address");
const userSchema_1 = require("./schema/userSchema");
function userRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.post("/create", userSchema_1.SchemaUser, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const user = yield (0, user_1.createUser)(body);
                return reply.code(201).send(user);
            }
            catch (e) {
                console.error("Error creating user:", e);
                return reply.code(500).send({ message: e });
            }
        }));
        server.post("/address", userSchema_1.SchemaCreateAddress, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const user = yield (0, address_1.registerAddress)(body);
                return reply.code(201).send(user);
            }
            catch (e) {
                console.error("Error creating address:", e);
                return reply.code(500).send({ message: "Internal Server Error" });
            }
        }));
        server.put("/address", userSchema_1.SchemaUpdateAddress, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const body = request.body;
            try {
                const user = yield (0, address_1.updateAddress)(body);
                return reply.code(201).send(user);
            }
            catch (e) {
                console.error("Error creating address:", e);
                return reply.code(500).send({ message: "Internal Server Error" });
            }
        }));
        server.get("/:id", Object.assign({ preHandler: [server.authenticate] }, userSchema_1.SchemaSaerchUser), (request, reply) => __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            try {
                const user = yield (0, user_1.findUserById)(Number(id));
                if (!user) {
                    return reply.code(404).send({ code: 404, message: `User with ID: ${id} was not found` });
                }
                return user;
            }
            catch (e) {
                console.error("Error searching user:", e);
                return reply.code(500).send({ message: "Internal Server Error" });
            }
        }));
    });
}
exports.default = userRoutes;
