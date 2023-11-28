import { ENVIRONMENT } from "../environment";
import { createClient } from "redis";
import { ChatRoom } from "../models/chatRoom";
import { getParamsString, toMiliseconds } from "./utils";
import api from "../api";

type Match = any;
type MatchQuery = {
  matchId: number;
};

export const client = createClient({ url: ENVIRONMENT.REDIS_URL });

client.on("error", (error) => {
  console.log(`⚡️[redis]: ERROR`);
  console.error(error);
});

// any because of an express typing issue
export const initServer = (app: any) => {
  console.log("[MONGO]: connected to database successfully");

  app.listen(ENVIRONMENT.SERVER_PORT, async () => {
    console.log(`⚡️[server]: is listening on port ${ENVIRONMENT.SERVER_PORT}`);
    await getAPIData();
  });
};

const createChatRoom = (match: Match) => {
  const chatRoom = new ChatRoom({
    matchId: match.id,
    homeTeam: match.homeTeam,
    awayTeam: match.awayTeam,
    utcStartDate: new Date(match.utcDate),
    status: match.status,
  });

  chatRoom
    .save()
    .then(() => console.log("ChatRoom created: ", JSON.stringify(chatRoom)))
    .catch((err) => console.log(err));
};

const findAndUpdateIfExist = async (
  query: MatchQuery,
  match: Match
): Promise<void> => {
  const existingMatch = await ChatRoom.findOne(query);
  existingMatch?.set(match);

  await existingMatch?.save();
};

const mapMatchesAndSaveOrUpdateDb = async (matches: Match[]) => {
  for await (const match of matches) {
    const query = { matchId: match.id };
    const matchExists = await ChatRoom.exists(query);

    if (!matchExists) {
      //previously && match.status !== MATCH_STATUS.FINISHED
      createChatRoom(match);
    } else {
      findAndUpdateIfExist(query, match);
    }
  }
};

const setRedisData = (responseData: any) => {
  client.set("matches", JSON.stringify(responseData));
};

const getAPIData = async () => {
  try {
    await client.connect();

    setInterval(async () => {
      try {
        const dateRangeParamString = getParamsString();
        const responseData = await api.getMatches(`?${dateRangeParamString}`);

        if (!responseData) {
          return;
        }

        // app talks to api who responds with REDIS
        setRedisData(responseData);

        // matches saved as chats in DB
        await mapMatchesAndSaveOrUpdateDb(responseData?.matches);

        // await postOrDeleteMatches(response.data?.matches)
        console.log(`⚡️[redis]: set API data in cache`);
      } catch (error) {
        console.log(`⚡️[redis]: Error setting API data in cache`);
      }
    }, toMiliseconds(10));
  } catch (error) {
    await client.disconnect();
    console.log(`⚡️[redis]: CLIENT DISCONNECTED`);
  }
};
