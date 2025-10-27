import express from 'express';
import { protect } from '../middlewares/auth.js';
import { imageMessageController, textMessageController } from '../contollers/messageContoller.js';
const messageRouter =express.Router()
messageRouter.post('/text',protect,textMessageController)
messageRouter.post('/image',protect,imageMessageController)
export default messageRouter;