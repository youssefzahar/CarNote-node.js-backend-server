const express = require('express')
const router = express.Router()
const MessageController = require('../Controllers/MessageController')


router.get("/", MessageController.getAllConversations)
router.get("/tout-messages", MessageController.getAllMessages)
router.get("/my-conversations/:senderId", MessageController.getMyConversations)
router.get("/my-messages/:conversationId", MessageController.getMyMessages)
router.post("/create-conversation", MessageController.createConversation)
router.post("/send-message", MessageController.sendMessage)
router.delete("/", MessageController.deleteConversation)
router.delete("/message", MessageController.deleteMessage)
router.delete("/deleteAll", MessageController.deleteAll)


module.exports = router