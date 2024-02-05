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
const axios_1 = __importDefault(require("axios"));
const _1 = require("./");
jest.mock('axios');
describe('TicketmasterAPI class', () => {
    const apiKey = 'your_api_key';
    const ticketmasterAPI = new _1.TicketmasterAPI(apiKey);
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('getAllEventsIn should call axios.get with the correct URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const country = 'US';
        const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${country}&apikey=${apiKey}`;
        yield ticketmasterAPI.getAllEventsIn(country);
        expect(axios_1.default.get).toHaveBeenCalledWith(expectedUrl);
    }));
    it('searchEventsByKeyword should call axios.get with the correct URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const keyword = 'concert';
        const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&source=universe&countryCode=US&apikey=${apiKey}`;
        yield ticketmasterAPI.searchEventsByKeyword(keyword);
        expect(axios_1.default.get).toHaveBeenCalledWith(expectedUrl);
    }));
    it('searchMusicEventsInLA should call axios.get with the correct URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=${apiKey}`;
        yield ticketmasterAPI.searchMusicEventsInLA();
        expect(axios_1.default.get).toHaveBeenCalledWith(expectedUrl);
    }));
    it('getEventsForAdeleInCanada should call axios.get with the correct URL', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=CA&apikey=${apiKey}`;
        yield ticketmasterAPI.getEventsForAdeleInCanada();
        expect(axios_1.default.get).toHaveBeenCalledWith(expectedUrl);
    }));
});
