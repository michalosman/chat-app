import mongoose from 'mongoose'

const reportSchema = mongoose.Schema(
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
    reported: {
      id: {
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
      id: String,
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
