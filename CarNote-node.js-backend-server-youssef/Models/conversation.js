const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConversationSchema = new Schema(
  {
    lastMessage : {type: String}, 
    lastMessageDate : {type: Date}, 
    sender : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    receiver : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
  },
  {
    timestamps: { currentTime: () => Date.now() },
  }
)

const Conversation = mongoose.model('Conversation', ConversationSchema)
module.exports = Conversation