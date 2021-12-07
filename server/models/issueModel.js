import mongoose from 'mongoose'

const issueSchema = mongoose.Schema(
  {
    sender: {
      id: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
    moderator: {
      id: String,
      username: String,
    },
    message: {
      type: String,
      required: true,
    },
    response: String,
    category: {
      type: String,
      required: true,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Issue = mongoose.model('Issue', issueSchema)

export default Issue
