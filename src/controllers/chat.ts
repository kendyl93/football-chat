import axios from 'axios';
import { ENVIRONMENT } from '../environment'

// any as a temporary workaround
const getMatches = async (req: any, res: any) => {
    // const chat = await Chat.find({})
    const response = await axios.get('http://api.football-data.org//v4/matches', { headers: { 'X-Auth-Token': ENVIRONMENT.FOOTBALL_DATA_API_TOKEN } })
    // console.log({ response })

    return res.send(response.data)
}

export const chatController = {
    getMatches
}