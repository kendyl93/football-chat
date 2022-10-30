import { client } from '../server/init'

// any as a temporary workaround
const getMatches = async (req: any, res: any) => {
    try {
        const matchesFromCache = await client.get('matches');

        if (matchesFromCache) {
            return res.status(200).send({
                error: false,
                message: `Todays matches from the cache`,
                data: JSON.parse(matchesFromCache)
            })
        }
    } catch (error) {
        console.error({ error })
    }

}

export const chatController = {
    getMatches
}