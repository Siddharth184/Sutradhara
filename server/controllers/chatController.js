import Chat from "../models/Chat.js"


// API Controller for creating a new chat


export const createChat = async (req, res)=>{
    try {
        const userId = req.user._id

        const chatData = {
            userId,
            messages: [],
            name: "NewChat",
            userName: req.user.name
        }

        await Chat.create(chatData)
        res.json({success: true, message: "chat created"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//API Controller for get all chat
export const getChat = async (req, res)=>{
    try {
        const userId = req.user._id

        const chats = await Chat.find({userId}).sort({updatedAt: -1})
        
        res.json({success: true, chats})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//API Controller for deleting a chat
export const deleteChat = async (req, res)=>{
    try {
        const userId = req.user._id
        const {chatId} = req.body

        await Chat.deleteOne({_id: chatId, userId})
        
        res.json({success: true, message: "chat deleted"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}
