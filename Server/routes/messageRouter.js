import express from 'express';
import { protect } from '../middlewares/auth.js';
import { imageMessageController, textMessagesController } from '../contollers/messageContoller.js';
const messageRouter =express.Router()
messageRouter.post('/text',protect,textMessagesController)
messageRouter.post('/image',protect,imageMessageController)
export default messageRouter;