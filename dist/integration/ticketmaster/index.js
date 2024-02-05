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
exports.TicketmasterAPI = void 0;
const axios_1 = __importDefault(require("axios"));
class TicketmasterAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://app.ticketmaster.com/discovery/v2/';
    }
    getAllEventsIn(country) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}events.json?countryCode=${country.toUpperCase()}&apikey=${this.apiKey}`;
            return axios_1.default.get(url);
        });
    }
    searchEventsByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}events.json?keyword=${keyword}&source=universe&countryCode=US&apikey=${this.apiKey}`;
            return axios_1.default.get(url);
        });
    }
    searchMusicEventsInLA() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${this.baseUrl}events.json?classificationName=music&dmaId=324&apikey=${this.apiKey}`;
            return axios_1.default.get(url);
        });
    }
    getEventsForAdeleInCanada() {
        return __awaiter(this, void 0, void 0, function* () {
            const attractionId = 'K8vZ917Gku7';
            const url = `${this.baseUrl}events.json?attractionId=${attractionId}&countryCode=CA&apikey=${this.apiKey}`;
            return axios_1.default.get(url);
        });
    }
}
exports.TicketmasterAPI = TicketmasterAPI;
