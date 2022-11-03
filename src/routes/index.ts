import { chatRoomRouter } from './chatRoom'
import { chatMessageRouter } from './chatMessage'

export const initRoutes = (app: any) => {
    app.use('/api/chatRoom', chatRoomRouter)
    app.use('/api/message', chatMessageRouter)
}