import { TicketmasterAPI } from '../../integration/ticketmaster';
import { CacheContainer } from 'node-ts-cache';
import { MemoryStorage } from 'node-ts-cache-storage-memory';
import env from "dotenv";

env.config();

const myCache = new CacheContainer(new MemoryStorage())

export async function getEvents(country:string) {
    let result;

    try {
        const apiKey = process.env.TICKETMASTER_KEY?? process.exit(1);
        const ticketmasterAPI = new TicketmasterAPI(apiKey);

        const cachedEvents = await myCache.getItem<any>("events");

        if (cachedEvents) {
            return cachedEvents
        }
        
        result = await ticketmasterAPI.getAllEventsIn(country);
        await myCache.setItem("events", result.data._embedded.events, {ttl: 60})

        return result.data._embedded.events;
    } catch (err:any) {
        return 500
    }
}
