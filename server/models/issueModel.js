import mongoose from 'mongoose'

const issueSchema = mongoose.Schema(
  {
    sender: {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    moderator: {
      id: String,
      name: String,
    },
    message: {
      type: String,
      required: true,
    },
    response: String,
    type: {
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
