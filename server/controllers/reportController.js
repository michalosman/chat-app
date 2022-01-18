import ApiError from '../error/ApiError.js'
import Report from '../models/Report.js'
import User from '../models/User.js'
import 'express-async-errors'

export const getReports = async (req, res) => {
  const reports = await Report.find()
  res.status(200).json(reports)
}

export const createReport = async (req, res) => {
  const creator = req.user
  const { reportedUser, description } = req.body

  if (!description) throw ApiError.badRequest('No description')

  const user = await User.findById(reportedUser._id)
  if (!user) throw ApiError.notFound('User not found')

  const newReport = new Report({
    sender: { _id: creator._id, name: creator.name },
    reportedUser,
    description,
  })

  await newReport.save()
  res.status(200).json(newReport)
}

export const closeReport = async (req, res) => {
  const moderator = req.user
  const { reportId } = req.params

  const updatedReport = await Report.findByIdAndUpdate(reportId, {
    moderator,
    isClosed: true,
  })

  res.status(200).json(updatedReport)
}
