import express, { Request, Response } from 'express'
import { Chat } from '../models/chatRoom'

const router = express.Router()

router.get('/api', async (req: Request, res: Response) => {
  // const chat = await Chat.find({})
  return res.status(200).send('working')
})

router.get('/api/chat', async (req: Request, res: Response) => {
  const chat = await Chat.find({})
  return res.status(200).send(chat)
})

router.post('/api/chat', async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const chat = Chat.build({ title, description })
  await chat.save()
  return res.status(201).send(chat)
})

export { router as chatRouter }