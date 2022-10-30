import axios from 'axios';
import mongoose, { model, Schema } from 'mongoose'
import { ENVIRONMENT } from '../environment'
import { createClient } from 'redis'

export const client = createClient({ url: ENVIRONMENT.REDIS_URL });

client.on("error", (error) => {
    console.log(`⚡️[redis]: ERROR`)
    console.error(error);
});

const getUnfinishedMatches = (matches: any[]) => matches.filter((match: any) => match.status !== 'FINISHED')

// any because of an express typing issue
export const initServer = (app: any) => {
    console.log('[MONGO]: connected to database successfully')

    app.listen(ENVIRONMENT.SERVER_PORT, async () => {
        console.log(`⚡️[server]: is listening on port ${ENVIRONMENT.SERVER_PORT}`)
        await getAPIData();
    })
}

interface IChat {
    name: string;
    matchId: number;
    expireAt: Date;

}

// 2. Create a Schema corresponding to the document interface.
const chatSchema = new Schema<IChat>({
    teams: { type: String, required: true },
    matchId: { type: Number, required: true },
    expireAt: {
        type: Date,
        expires: 11,
        default: Date.now
    }
});

const Chat = model<IChat>('Cat', chatSchema)

const getAPIData = async () => {
    try {
        await client.connect();

        // setInterval(async () => {
        try {
            const response = await axios.get(`${ENVIRONMENT.FOOTBALL_API_DATA_URL}matches?status=LIVE`, { headers: { 'X-Auth-Token': ENVIRONMENT.FOOTBALL_DATA_API_TOKEN } })
            client.set('matches', JSON.stringify(response.data));
            console.log({ RES: response.data })

            // Create documents if not exist
            response.data?.matches?.map(async (match: any) => {
                console.log({ ID: match.id })
                console.log({ teams: `${match.homeTeam.name} - ${match.awayTeam.name}` })

                const chat = new Chat({ matchId: match.id, teams: `${match.homeTeam.name} - ${match.awayTeam.name}` });

                const query = { matchId: match.id };
                const matchExist = await Chat.exists(query);
                console.log({ matchExist })

                if (!matchExist) {
                    chat.save().then(() => console.log('meow')).catch(err => console.log(err));
                }

            })
            console.log(`⚡️[redis]: set API data in cache`)
        } catch (error) {
            console.log(`⚡️[redis]: Error setting API data in cache`)
        }
        // }, 10 * 1000);
    } catch (error) {
        await client.disconnect();
        console.log(`⚡️[redis]: CLIENT DISCONNECTED`)
    }

}