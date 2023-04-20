import fetch from 'cross-fetch';
import { forTime } from 'waitasecond';
// TODO: Probably to LIB waitasecond

export async function fetchJsonRetry(url) {
    let lastError = null;

    for (let i = 0; i < 1000; i++) {
        await forTime(200 /* to attempt next fetch (re)try */);
        try {
            console.info(`Trying to fetch "${url}".`);
            const response = await fetch(url, { cache: 'no-store' });
            return await response.json();
        } catch (error) {
            lastError = error;
        }
    }

    throw new Error(lastError);
}
