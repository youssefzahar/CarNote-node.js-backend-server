const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MessageSchema = new Schema(
  {
    description: { type: String },
    date: { type: Date, default: Date.now },
    senderConversation : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Conversation"
    },
    receiverConversation : {
      type : mongoose.Schema.Types.ObjectId, 
      ref: "Conversation"
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)

const Message = mongoose.model('Message', MessageSchema)
module.exports = Message