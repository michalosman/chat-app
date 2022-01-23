import ApiError from '../error/ApiError.js'
import Report from '../models/Report.js'
import User from '../models/User.js'
import mongoose from 'mongoose'
import 'express-async-errors'

export const getReports = async (req, res) => {
  const reports = await Report.find()
  res.status(200).json(reports)
}

export const createReport = async (req, res) => {
  const creator = req.user
  const { reportedId, description } = req.body

  const isUserIdValid = mongoose.Types.ObjectId.isValid(reportedId)
  if (!isUserIdValid) throw ApiError.badRequest('Invalid user id')

  if (!description) throw ApiError.badRequest('No description')

  const user = await User.findById(reportedId)
  if (!user) throw ApiError.notFound('Reported user not found')

  const newReport = new Report({
    sender: { id: creator._id, name: creator.name },
    reported: { id: user._id, name: user.name },
    description,
  })

  await newReport.save()

  res.status(200).json({ id: newReport._id, createdAt: newReport.createdAt })
}

export const closeReport = async (req, res) => {
  const moderator = req.user
  const { reportId } = req.params

  const updatedReport = await Report.findByIdAndUpdate(reportId, {
    moderator,
    isClosed: true,
  })

  res
    .status(200)
    .json({ id: updatedReport._id, isClosed: updatedReport.isClosed })
}
