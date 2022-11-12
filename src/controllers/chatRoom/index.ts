import { ChatRoom } from '../../models/chatRoom';
import { client } from '../../server/init'

// any as a temporary workaround
const getAPI = async (req: any, res: any) => {
    try {
        console.log('TAKING API')
        const matchesFromCache = await client.get('matches');

        // const unfinishedMatches = matchesFromCache && getUnfinishedMatches(JSON.parse(matchesFromCache)?.matches)

        if (matchesFromCache) {
            return res.status(200).send({
                error: false,
                message: `UNFINISHED matches from the cache`,
                data: JSON.parse(matchesFromCache)
            })
        }
    } catch (error) {
        console.error({ error })
    }

}

const getChatRooms = async (req: any, res: any) => {
    try {
        const chatRooms = await ChatRoom.find({});

        res.send(chatRooms)
    } catch (error) {
        console.error({ error })
    }

}


export const chatRoomController = {
    getAPI,
    getChatRooms
}