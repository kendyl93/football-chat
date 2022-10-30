import axios from 'axios';
import { ENVIRONMENT } from '../environment'
import { createClient } from 'redis'

export const client = createClient({ url: ENVIRONMENT.REDIS_URL });

client.on("error", (error) => {
    console.log(`⚡️[redis]: ERROR`)
    console.error(error);
});


// any because of an express typing issue
export const initServer = (app: any) => () => {
    console.log('[MONGO]: connected to database successfully')

    app.listen(ENVIRONMENT.SERVER_PORT, async () => {
        console.log(`⚡️[server]: is listening on port ${ENVIRONMENT.SERVER_PORT}`)
        await getAPIData();
    })
}

const getAPIData = async () => {
    try {
        await client.connect();

        setInterval(async () => {
            try {
                const response = await axios.get(`${ENVIRONMENT.FOOTBALL_API_DATA_URL}matches`, { headers: { 'X-Auth-Token': ENVIRONMENT.FOOTBALL_DATA_API_TOKEN } })
                client.set('matches', JSON.stringify(response.data));
                console.log(`⚡️[redis]: set API data in cache`)
            } catch (error) {
                console.log(`⚡️[redis]: Error setting API data in cache`)
            }
        }, 10 * 1000);
    } catch (error) {
        await client.disconnect();
        console.log(`⚡️[redis]: CLIENT DISCONNECTED`)
    }

}