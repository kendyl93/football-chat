import axios, { AxiosRequestConfig } from 'axios';
import { ENVIRONMENT } from '../environment'
import { createClient } from 'redis'
import { ChatRoom } from '../models/chatRoom';
import { postOrDeleteMatches } from '../controllers/api'

export const client = createClient({ url: ENVIRONMENT.REDIS_URL });

const TEN_SECONDS_IN_MILISECONDS = 10 * 1000

client.on("error", (error) => {
    console.log(`⚡️[redis]: ERROR`)
    console.error(error);
});

// any because of an express typing issue
export const initServer = (app: any) => {
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
                const axiosConfig: AxiosRequestConfig = {
                    headers: {
                        'X-Auth-Token': ENVIRONMENT.FOOTBALL_DATA_API_TOKEN
                    },
                };
                const response = await axios.get(`${ENVIRONMENT.FOOTBALL_API_DATA_URL}matches`, axiosConfig)
                client.set('matches', JSON.stringify(response.data));

                // Create documents if not exist
                response.data?.matches?.map(async (match: any) => {
                    const chatRoom = new ChatRoom({ matchId: match.id, teams: `${match.homeTeam.name} - ${match.awayTeam.name}` });

                    const query = { matchId: match.id };
                    const matchExist = await ChatRoom.exists(query);

                    if (!matchExist) {
                        chatRoom.save().then(() => console.log('ChatRoom created: ', JSON.stringify(chatRoom))).catch(err => console.log(err));
                    }

                })
                await postOrDeleteMatches(response.data?.matches)
                console.log(`⚡️[redis]: set API data in cache`)
            } catch (error) {
                console.log(`⚡️[redis]: Error setting API data in cache`)
            }
        }, TEN_SECONDS_IN_MILISECONDS);
    } catch (error) {
        await client.disconnect();
        console.log(`⚡️[redis]: CLIENT DISCONNECTED`)
    }
}