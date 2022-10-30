import { client } from '../server/init'

const getUnfinishedMatches = (matches: any[]) => matches.filter((match: any) => match.status !== 'FINISHED')

// any as a temporary workaround
const getMatches = async (req: any, res: any) => {
    try {
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

export const chatController = {
    getMatches
}