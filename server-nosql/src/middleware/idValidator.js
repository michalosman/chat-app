import mongoose from 'mongoose'
import ApiError from '../error/ApiError.js'

const idValidator = (req, res, next) => {
  const { userId, chatId, reportId } = req.params

  if (userId) {
    const isUserIdValid = mongoose.Types.ObjectId.isValid(userId)
    if (!isUserIdValid) throw ApiError.badRequest('Invalid user id')
  }

  if (chatId) {
    const isChatIdValid = mongoose.Types.ObjectId.isValid(chatId)
    if (!isChatIdValid) throw ApiError.badRequest('Invalid chat id')
  }

  if (reportId) {
    const isReportIdValid = mongoose.Types.ObjectId.isValid(reportId)
    if (!isReportIdValid) throw ApiError.badRequest('Invalid report id')
  }

  next()
}

export default idValidator
