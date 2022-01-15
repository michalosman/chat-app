import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
    enum: ['admin', 'moderator', 'user'],
    required: true,
    default: 'user',
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
