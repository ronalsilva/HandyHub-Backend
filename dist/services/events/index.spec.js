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
const _1 = require("./");
const ticketmaster_1 = require("../../integration/ticketmaster");
const node_ts_cache_1 = require("node-ts-cache");
const node_ts_cache_storage_memory_1 = require("node-ts-cache-storage-memory");
const dotenv_1 = __importDefault(require("dotenv"));
jest.mock('../../integration/ticketmaster');
jest.mock('node-ts-cache');
dotenv_1.default.config();
describe('getEvents function', () => {
    const mockApiKey = 'mock-api-key';
    process.env.TICKETMASTER_KEY = mockApiKey;
    const mockCachedEvents = ['Event1', 'Event2'];
    const mockTicketmasterAPIInstance = new ticketmaster_1.TicketmasterAPI(mockApiKey);
    const mockCacheInstance = new node_ts_cache_1.CacheContainer(new node_ts_cache_storage_memory_1.MemoryStorage());
    beforeEach(() => {
        jest.clearAllMocks();
    });
    // it('should return cached events if available', async () => {
    //     jest.spyOn(mockCacheInstance, 'getItem').mockResolvedValue(mockCachedEvents);
    //     const result = await getEvents('USA');
    //     expect(result).toEqual(mockCachedEvents);
    //     expect(mockTicketmasterAPIInstance.getAllEventsIn).not.toHaveBeenCalled();
    // });
    it('should return 500 if an error occurs', () => __awaiter(void 0, void 0, void 0, function* () {
        jest.spyOn(mockCacheInstance, 'getItem').mockRejectedValue(new Error('Cache error'));
        const result = yield (0, _1.getEvents)('USA');
        expect(result).toEqual(500);
        expect(mockTicketmasterAPIInstance.getAllEventsIn).not.toHaveBeenCalled();
    }));
});
