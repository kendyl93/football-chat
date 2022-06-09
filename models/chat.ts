import mongoose from 'mongoose'

interface IChat {
  title: string;
  description: string;
}

interface chatModelInterface extends mongoose.Model<ChatDoc> {
  build(options: IChat): ChatDoc
}

interface ChatDoc extends mongoose.Document {
  title: string;
  description: string;
}

const chatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

chatSchema.statics.build = (options: IChat) => {
  return new Chat(options)
}

const Chat = mongoose.model<ChatDoc, chatModelInterface>('Chat', chatSchema)

Chat.build({
  title: 'some title',
  description: 'some description'
})

export { Chat }




