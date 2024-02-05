import { getEvents } from './';
import { TicketmasterAPI } from '../../integration/ticketmaster';
import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import env from "dotenv";

jest.mock('../../integration/ticketmaster');

jest.mock('node-ts-cache');

env.config();

describe('getEvents function', () => {
    const mockApiKey = 'mock-api-key';
    process.env.TICKETMASTER_KEY = mockApiKey;

    const mockCachedEvents = ['Event1', 'Event2'];
    const mockTicketmasterAPIInstance = new TicketmasterAPI(mockApiKey);
    const mockCacheInstance = new CacheContainer(new MemoryStorage());

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // it('should return cached events if available', async () => {
    //     jest.spyOn(mockCacheInstance, 'getItem').mockResolvedValue(mockCachedEvents);

    //     const result = await getEvents('USA');
    //     expect(result).toEqual(mockCachedEvents);
    //     expect(mockTicketmasterAPIInstance.getAllEventsIn).not.toHaveBeenCalled();
    // });

    it('should return 500 if an error occurs', async () => {
        jest.spyOn(mockCacheInstance, 'getItem').mockRejectedValue(new Error('Cache error'));

        const result = await getEvents('USA');
        expect(result).toEqual(500);
        expect(mockTicketmasterAPIInstance.getAllEventsIn).not.toHaveBeenCalled();
    });
});