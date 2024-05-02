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
const events_1 = require("../../services/events");
const eventSchema_1 = require("./schema/eventSchema");
function eventsRoutes(server) {
    return __awaiter(this, void 0, void 0, function* () {
        server.get("/events/:country", {
            schema: {
                params: eventSchema_1.RequestEventSchema,
                response: {
                    200: eventSchema_1.ResponseEventSchema
                },
            },
        }, (request, reply) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const params = request.params;
                const events = yield (0, events_1.getEvents)(params.country);
                reply.send(events);
            }
            catch (err) {
                reply.status(((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) || 500).send({ error: err.message });
            }
        }));
    });
}
exports.default = eventsRoutes;
