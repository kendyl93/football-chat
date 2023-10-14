import { model, Schema } from 'mongoose'

export const HOURS_TO_EXPIRE = 2;
const HOURS_IN_MILISEDCONDS = 1000 * 60 * HOURS_TO_EXPIRE;

export enum MATCH_STATUS {
  SCHEDULED = 'SCHEDULED',
  TIMED = 'TIMED',
  IN_PLAY = 'IN_PLAY',
  PAUSED = 'PAUSED',
  FINISHED = 'FINISHED',
  SUSPENDED = 'SUSPENDED',
  POSTPONED = 'POSTPONED',
  CANCELLED = 'CANCELLED',
  AWARDED = 'AWARDED'

}

interface IChatRoom {
  homeTeam: any;
  awayTeam: any;
  matchId: number;
  status: MATCH_STATUS;
  utcStartDate: string;
  expireAt: Date;
  messages: any;
}

const chatRoomSchema = new Schema<IChatRoom>({
  homeTeam: { type: Object, required: true },
  awayTeam: { type: Object, required: true },
  matchId: { type: Number, required: true },
  status: { type: MATCH_STATUS, required: true }, // update type to enum
  utcStartDate: { type: Date, required: true },
  expireAt: { type: Date, expires: HOURS_IN_MILISEDCONDS },
  messages: [{ type: Schema.Types.ObjectId, ref: 'ChatMessage' }]
});

chatRoomSchema.pre('save', function (next: any) {
  if (this.isModified('status') && this.status === MATCH_STATUS.FINISHED) {
    this.expireAt = new Date(Date.now());
  }

  next();
});

const ChatRoom = model<IChatRoom>('ChatRoom', chatRoomSchema)

export { ChatRoom }




