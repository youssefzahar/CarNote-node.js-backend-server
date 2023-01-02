const Message = require('../Models/Message')
const Conversation = require('../Models/conversation')



const getAllConversations = async (req, res) => {
    res.send({conversations: await Conversation.find()})
}



const getAllMessages = async (req, res) => {
    res.send({messages: await Message.find()})
}



const getMyConversations = async (req, res) => {
    res.send({conversations: await Conversation.find(
        {"sender": req.params.senderId}).populate("sender receiver")})
}



const getMyMessages = async (req, res) => {
    res.send({
        messages: await Message.find(
            {
                $or: [
                    {'senderConversation': req.params.conversationId},
                    {'receiverConversation': req.params.conversationId},
                ]
            }
        ).populate("senderConversation receiverConversation")
    })
}

const createConversation = async (req, res) => {
    const {sender, receiver} = req.body

    let senderConversation = await Conversation.findOne({"sender": sender, "receiver": receiver})
    if (!senderConversation) {
        senderConversation = new Conversation()
        senderConversation.sender = sender
        senderConversation.receiver = receiver
    }
    senderConversation.lastMessage = "New conversation"
    senderConversation.lastMessageDate = Date()
    senderConversation.save()
    res.status(200).send({message: "success"})
}



const sendMessage = async (req, res) => {
    const {description, senderId, receiverId} = req.body

    let senderConversation = await Conversation.findOne({"sender": senderId, "receiver": receiverId})
    if (!senderConversation) {
        senderConversation = new Conversation()
        senderConversation.sender = senderId
        senderConversation.receiver = receiverId
    }
    senderConversation.lastMessage = description
    senderConversation.lastMessageDate = Date()
    senderConversation.save()

    let receiverConversation = await Conversation.findOne({"sender": receiverId, "receiver": senderId})
    if (!receiverConversation) {
        receiverConversation = new Conversation()
        receiverConversation.sender = receiverId
        receiverConversation.receiver = senderId
    }
    receiverConversation.lastMessage = description
    receiverConversation.lastMessageDate = Date()
    receiverConversation.save()

    const newMessage = new Message()
    newMessage.description = description
    newMessage.senderConversation = senderConversation._id
    newMessage.receiverConversation = receiverConversation._id
    await newMessage.save()

    res.status(200).send({message: "success", newMessage: newMessage})
}



const deleteMessage = async (req, res) => {
    await Message.findById(req.body._id).remove();
    res.status(200).send({message: "success"})
}



const deleteConversation = async (req, res) => {
    const conversation = await Conversation.findById(req.body._id).remove()
    res.status(200).send({message: "success", conversation})
}



const deleteAll = (req, res) => {
    Conversation.remove({}, function (err) {
        if (err) {
            return handleError(res, err)
        }
    })
    Message.remove({}, function (err) {
        if (err) {
            return handleError(res, err)
        }
    })

    res.status(204).send({message: "done"})
}


module.exports = {
    getAllConversations,getAllMessages,getMyMessages,getMyConversations,createConversation,sendMessage,deleteConversation,deleteMessage,deleteAll
}