import mongoose from 'mongoose'
import Report from '../models/Report.js'
import User from '../models/User.js'

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find()
    res.status(200).json(reports)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createReport = async (req, res) => {
  const creator = req.user
  const { reportedUser, description } = req.body

  if (!description)
    return res
      .status(400)
      .json({ message: 'Report must contain a description' })

  const user = await User.findById(reportedUser._id)

  if (!user) return res.status(404).json({ message: 'User not found' })

  const report = {
    sender: { _id: creator._id, name: creator.name },
    reportedUser,
    description,
  }

  const newReport = new Report(report)

  try {
    await newReport.save()
    res.status(200).json(newReport)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const closeReport = async (req, res) => {
  const moderator = req.user
  const { reportId } = req.params

  if (!mongoose.Types.ObjectId.isValid(reportId))
    return res.status(400).json({ message: 'Invalid report id' })

  try {
    const updatedReport = await Report.findByIdAndUpdate(reportId, {
      moderator,
      isClosed: true,
    })
    res.status(200).json(updatedReport)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
