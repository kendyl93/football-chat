import axios from 'axios';
import { createClient } from 'redis'
import { ENVIRONMENT } from '../environment'

const client = createClient({ url: 'redis://redis:6379' });

client.on("error", (error) => {
    console.error(error);
});

// any as a temporary workaround
const getMatches = async (req: any, res: any) => {
    // const chat = await Chat.find({})

    try {
        await client.connect();
        const matchesFromCache = await client.get('matches');

        if (matchesFromCache) {
            return res.status(200).send({
                error: false,
                message: `Todays matches from the cache`,
                data: JSON.parse(matchesFromCache)
            })
        } else { // When the data is not found in the cache then we can make request to the server
            const response = await axios.get('http://api.football-data.org//v4/matches', { headers: { 'X-Auth-Token': ENVIRONMENT.FOOTBALL_DATA_API_TOKEN } })

            // save the record in the cache for subsequent request
            client.set('matches', JSON.stringify(response.data));

            // return the result to the client
            return res.status(200).send({
                error: false,
                message: `Todays matches from the server`,
                data: response.data
            });
        }
    } catch (error) {
        console.error({ error })
    } finally {
        await client.disconnect();
    }

}

export const chatController = {
    getMatches
}