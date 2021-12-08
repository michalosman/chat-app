import mongoose from 'mongoose'

const memberSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: memberSchema,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const chatSchema = mongoose.Schema({
  members: {
    type: [memberSchema],
    required: true,
  },
  messages: {
    type: [messageSchema],
    default: [],
  },
})

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
