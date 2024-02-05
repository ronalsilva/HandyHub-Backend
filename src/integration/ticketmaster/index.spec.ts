import axios from 'axios';
import { TicketmasterAPI } from './';

jest.mock('axios');

describe('TicketmasterAPI class', () => {
    const apiKey = 'your_api_key';
    const ticketmasterAPI = new TicketmasterAPI(apiKey);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getAllEventsIn should call axios.get with the correct URL', async () => {
        const country = 'US';
        const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${country}&apikey=${apiKey}`;
        await ticketmasterAPI.getAllEventsIn(country);
        expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('searchEventsByKeyword should call axios.get with the correct URL', async () => {
        const keyword = 'concert';
        const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&source=universe&countryCode=US&apikey=${apiKey}`;
        await ticketmasterAPI.searchEventsByKeyword(keyword);
        expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('searchMusicEventsInLA should call axios.get with the correct URL', async () => {
        const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=${apiKey}`;
        await ticketmasterAPI.searchMusicEventsInLA();
        expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });

    it('getEventsForAdeleInCanada should call axios.get with the correct URL', async () => {
        const expectedUrl = `https://app.ticketmaster.com/discovery/v2/events.json?attractionId=K8vZ917Gku7&countryCode=CA&apikey=${apiKey}`;
        await ticketmasterAPI.getEventsForAdeleInCanada();
        expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
});