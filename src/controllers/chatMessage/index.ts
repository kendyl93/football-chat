import { ChatMessage } from "../../models/chatMessage";
import { ChatRoom } from "../../models/chatRoom";

// const postMessage = async (req: any, res: any): Promise<void> => {
//     console.log('POSTMESSAGE hELLOOOo')
//     const message = new ChatMessage(req.body);

//     message.save({ timestamps: false }).then(() => {
//         console.log('message saved')
//     }).catch((error) => console.log({ error }))

//     res.status(200)
// };


const postMessage = async (req: any, res: any) => {
    try {
        const body = new ChatMessage(req.body);

        console.log({ body2: req.body })
        // Create a new ChatMessage document
        const newMessage = new ChatMessage(body);
        const chatRoom = await ChatRoom.findOne({ matchId: 444321 });
        newMessage.roomId = chatRoom?._id;
        console.log({ newMessage, chatRoom })
        // Save the new message
        await newMessage.save();
        console.log('after save')
        // Associate the message with the chat room
        if (!chatRoom) {
            throw new Error('Chat room not found'); // Handle the case where the chat room is not found
        }

        console.log({ chatRoom })

        chatRoom.messages.push(newMessage._id); // Add the message to the chat room's messages array
        await chatRoom.save();

        return res.status(200); // Return the posted message
    } catch (error) {
        throw error;
    }
}

const getMessage = async (req: any, res: any): Promise<void> => {
    try {

        console.log({ req })
        const roomId = req.params.roomId;
        // Find the ChatRoom by roomId
        const chatRoom = await ChatRoom.findOne({ matchId: roomId });
        if (!chatRoom) {
            return res.status(404).send('ChatRoom not found');
        }

        // Retrieve all related ChatMessages using populate
        const messages = await ChatMessage.find({ roomId: chatRoom._id }).populate('roomId');

        res.send(messages);
    } catch (error) {
        console.error(error)
    }
}


export const chatMessageController = {
    getMessage,
    postMessage
}