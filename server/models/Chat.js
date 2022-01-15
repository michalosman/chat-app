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

const chatSchema = mongoose.Schema(
  {
    ownerId: {
      type: String,
    },
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: ['private', 'group'],
      default: 'private',
    },
    members: {
      type: [memberSchema],
      required: true,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
    recentMessage: {
      type: messageSchema,
    },
  },
  { timestamps: true }
)

const Chat = mongoose.model('Chat', chatSchema)

export default Chat
