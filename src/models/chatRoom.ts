import mongoose, { model, Schema } from 'mongoose'

const ONE_HOUR_IN_SEDCONDS = 3600;

interface IChatRoom {
  name: string;
  matchId: number;
  expireAt: Date;
}

const chatRoomSchema = new Schema<IChatRoom>({
  teams: { type: String, required: true },
  matchId: { type: Number, required: true },
  expireAt: {
    type: Date,
    expires: ONE_HOUR_IN_SEDCONDS,
    default: Date.now
  }
});

const ChatRoom = model<IChatRoom>('ChatRoom', chatRoomSchema)

export { ChatRoom }




