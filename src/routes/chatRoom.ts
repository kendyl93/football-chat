import express from 'express'
import { chatRoomController } from '../controllers/chatRoom'

const router = express.Router()

router.get('/test', chatRoomController.getAPI)
router.get('/', chatRoomController.getChatRooms)

export { router as chatRoomRouter }