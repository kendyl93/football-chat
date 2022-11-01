import mongoose, { model, Schema } from 'mongoose'

const ONE_HOUR_IN_SEDCONDS = 3600;

interface IChatMessage {
  name: string;
  message: string;
}

const chatMessageSchema = new Schema<IChatMessage>({
  name: { type: String, required: true },
  message: { type: String, required: true },
});

const ChatMessage = model<IChatMessage>('ChatMessage', chatMessageSchema)

export { ChatMessage }




