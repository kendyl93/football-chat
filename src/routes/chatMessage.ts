import express from 'express'
import { chatMessageController } from '../controllers/chatMessage'

const router = express.Router()

router.post('', chatMessageController.postMessage)
router.get('/:roomId', chatMessageController.getMessage)


export { router as chatMessageRouter }