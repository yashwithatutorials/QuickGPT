import Chat from "../models/chat.js"

//contoller for creating new chat


export const createChat=async (req,res)=>{
    try{
        const userId=req.user._id
        const chatData={
            userId,
            messages:[],
            name:"new Chat",
            userName:req.user.name
        }
        await Chat.create(chatData)
        res.json({success:true,message:"Chat Created"})
    } catch(error){
        res.json({success:false,message:error.message})

    }
}

//getting all chats
export const getChats=async (req,res)=>{
    try{
        const userId=req.user._id
        const chats=await Chat.find({userId}).sort({updatedAt:-1})
        res.json({success:true,Chats})
    } catch(error){
        res.json({success:false,message:error.message})

    }
}

//detele chat
export const deleteChat=async (req,res)=>{
    try{
        const userId=req.user._id
        const {chatId}=req.body
        await Chat.deleteOne({_id:chatId,userId})
        res.json({success:true,message:"Chat deleted"})
    } catch(error){
        res.json({success:false,message:error.message})

    }
}

