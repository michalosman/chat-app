import mongoose from 'mongoose'

const reportSchema = mongoose.Schema(
  {
    sender: {
      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    reportedUser: {
      _id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: true,
    },
    moderator: {
      _id: String,
      name: String,
    },
    isClosed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

const Report = mongoose.model('Report', reportSchema)

export default Report
