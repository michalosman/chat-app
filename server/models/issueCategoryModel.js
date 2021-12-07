import mongoose from 'mongoose'

const issueCategorySchema = {
  name: {
    type: String,
    required: true,
  },
}

const IssueCategory = mongoose.model('IssueCategory', issueCategorySchema)

export default IssueCategory
