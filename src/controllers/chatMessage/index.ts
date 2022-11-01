import { ChatMessage } from "../../models/chatMessage";

const postMessage = async (req: any, res: any): Promise<void> => {
    const message = new ChatMessage(req.body);

    message.save().then(() => console.log('saved')).catch(() => console.log('FAILED'))
};

const getMessage = async (req: any, res: any): Promise<void> => {
    const messages = await ChatMessage.find({});
    res.send(messages)
}


export const chatMessageController = {
    getMessage,
    postMessage
}