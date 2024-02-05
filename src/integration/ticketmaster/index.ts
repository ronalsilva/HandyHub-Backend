import axios, { AxiosResponse } from 'axios';

export class TicketmasterAPI {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://app.ticketmaster.com/discovery/v2/';
    }

    async getAllEventsIn(country:string): Promise<AxiosResponse> {
        const url = `${this.baseUrl}events.json?countryCode=${country.toUpperCase()}&apikey=${this.apiKey}`;
        return axios.get(url);
    }

    async searchEventsByKeyword(keyword: string): Promise<AxiosResponse> {
        const url = `${this.baseUrl}events.json?keyword=${keyword}&source=universe&countryCode=US&apikey=${this.apiKey}`;
        return axios.get(url);
    }

    async searchMusicEventsInLA(): Promise<AxiosResponse> {
        const url = `${this.baseUrl}events.json?classificationName=music&dmaId=324&apikey=${this.apiKey}`;
        return axios.get(url);
    }

    async getEventsForAdeleInCanada(): Promise<AxiosResponse> {
        const attractionId = 'K8vZ917Gku7';
        const url = `${this.baseUrl}events.json?attractionId=${attractionId}&countryCode=CA&apikey=${this.apiKey}`;
        return axios.get(url);
    }
}