import { model, Schema } from 'mongoose'

interface IChatMessage {
  senderId: string;
  senderName: string;
  message: string;
  roomId: number;
}

const chatMessageSchema = new Schema<IChatMessage>({
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Number, default: Date.now() },
  roomId: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true }
});

const ChatMessage = model<IChatMessage>('ChatMessage', chatMessageSchema)

export { ChatMessage }




