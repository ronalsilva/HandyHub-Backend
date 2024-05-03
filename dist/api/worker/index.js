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
function userRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.get("/:id", { schema: { tags: ['Worker'], summary: 'Redirect login with Gmail' } }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
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
