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
exports.getEvents = void 0;
const ticketmaster_1 = require("../../integration/ticketmaster");
const node_ts_cache_1 = require("node-ts-cache");
const node_ts_cache_storage_memory_1 = require("node-ts-cache-storage-memory");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const myCache = new node_ts_cache_1.CacheContainer(new node_ts_cache_storage_memory_1.MemoryStorage());
function getEvents(country) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            const apiKey = (_a = process.env.TICKETMASTER_KEY) !== null && _a !== void 0 ? _a : process.exit(1);
            const ticketmasterAPI = new ticketmaster_1.TicketmasterAPI(apiKey);
            const cachedEvents = yield myCache.getItem("events");
            if (cachedEvents) {
                return cachedEvents;
            }
            result = yield ticketmasterAPI.getAllEventsIn(country);
            yield myCache.setItem("events", result.data._embedded.events, { ttl: 60 });
            return result.data._embedded.events;
        }
        catch (err) {
            return 500;
        }
    });
}
exports.getEvents = getEvents;
