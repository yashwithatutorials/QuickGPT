import express from "express";
import { getPlans, purchasePlans } from "../contollers/creditController.js";
import { protect } from "../middlewares/auth.js";
const creditRouter=express.Router()
creditRouter.get('/plan',getPlans)
creditRouter.post('/purchase',protect,purchasePlans)
export default  creditRouter;