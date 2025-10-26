import jwt from 'jsonwebtoken'
import User from '../models/user.js';
export const protect=async (req,res,next)=>{
    let token=req.headers.authorization;
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const userId=decoded.id;
        const user=await User.findById(userId)
        if(!user){
            return res.json({success:false,message:"Not authorizezd,user not found"});
        }
        req.user=user;
    } catch(error){
        res.status(401).json({message:"Not authorized,failed"})
    }
}