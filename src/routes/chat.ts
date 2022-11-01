import express from 'express'
import { chatController } from '../controllers/chatRoom'

const router = express.Router()

router.get('/api', chatController.getMatches)

// router.get('/api/chat', async (req: Request, res: Response) => {
//   const chat = await Chat.find({})
//   return res.send('chat')
// })

// router.post('/api/chat', async (req: Request, res: Response) => {
// const { title, description } = req.body;

// const chat = Chat.build({ title, description })
// await chat.save()
//   return res.send('chat')
// })

export { router as chatRouter }