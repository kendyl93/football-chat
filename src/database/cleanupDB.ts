import { ChatMessage } from "../models/chatMessage";
import { ChatRoom, HOURS_TO_EXPIRE } from "../models/chatRoom";

type ChatRoRemoveCriteria = {
    utcStartDate: {
        $lt: string
    }
}

export const cleanupDatabase = async () => {
    try {
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - HOURS_TO_EXPIRE);

        const criteria = {
            utcStartDate: { $lt: twoDaysAgo.toISOString() }
        };

        await cleanChatRooms(criteria);
        await cleanChatMessagesForNonExistChatRooms();
    } catch (error) {
        console.error('Error cleaning up the database:', error);
    }
}

const cleanChatRooms = async (criteria: ChatRoRemoveCriteria) => {
    const chatRoomsToRemove = await ChatRoom.find(criteria);

    for (const chatRoom of chatRoomsToRemove) {
        await ChatMessage.deleteMany({ roomId: chatRoom._id });
        await chatRoom.remove();

        console.log('[cleanupDatabase][chatRoom] Removed chat rooms and associated chat messages: ', chatRoom.id);
    }
}

const cleanChatMessagesForNonExistChatRooms = async () => {
    const chatMessagesWithOrphanedRooms = await ChatMessage.find({
        roomId: { $exists: true },
    });

    for (const chatMessage of chatMessagesWithOrphanedRooms) {
        const existingRoom = await ChatRoom.findById(chatMessage.roomId);
        if (!existingRoom) {
            await chatMessage.remove();
            console.log('[cleanupDatabase][chatMessage] Removed chat rooms and associated chat messages: ', chatMessage.id);
        }
    }
}