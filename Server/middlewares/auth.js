// import jwt from 'jsonwebtoken'
// import User from '../models/user.js';
// export const protect=async (req,res,next)=>{
//     let token=req.headers.authorization;
//     try{
//         const decoded=jwt.verify(token,process.env.JWT_SECRET)
//         const userId=decoded.id;
//         const user=await User.findById(userId)
//         if(!user){
//             return res.json({success:false,message:"Not authorizezd,user not found"});
//         }
//         req.user=user;
//         next();
//     } catch(error){
//         res.status(401).json({message:"Not authorized,failed"})
//     }
// }

import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();

    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};
