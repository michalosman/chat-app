import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  chats: {
    type: [String],
    default: [],
  },
  reportsCount: {
    type: Number,
    default: 0,
  },
  warningsCount: {
    type: Number,
    default: 0,
  },
  isBlocked: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const User = mongoose.model('User', userSchema)

export default User
