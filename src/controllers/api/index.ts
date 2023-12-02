import { ChatRoom } from "../../models/chatRoom";
import { Match } from "./types";

// not using it
const postOrDeleteMatches = async (matches: Match[]): Promise<void> => {
  matches?.map(async (match: Match) => {
    const teams = `${match.homeTeam.name} - ${match.awayTeam.name}`;

    const chatRoom = new ChatRoom({ matchId: match.id, teams });

    const query = { matchId: match.id };
    const matchExist = await ChatRoom.exists(query);

    if (!matchExist) {
      chatRoom.save();
    }
  });
};

export { postOrDeleteMatches };
