import mongoose, { model, Schema } from 'mongoose'

interface IChatMessage {
  name: string;
  message: string;
}

const chatMessageSchema = new Schema<IChatMessage>({
  name: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Number, default: Date.now() },
  matchId: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true }
});

const ChatMessage = model<IChatMessage>('ChatMessage', chatMessageSchema)

export { ChatMessage }




