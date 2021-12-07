import mongoose from 'mongoose'

const issueTypeSchema = {
  name: {
    type: String,
    required: true,
  },
}

const IssueType = mongoose.model('IssueType', issueTypeSchema)

export default IssueType
