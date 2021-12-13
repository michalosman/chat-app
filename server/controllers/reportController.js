import mongoose from 'mongoose'
import Report from '../models/reportModel.js'
import User from '../models/userModel.js'

export const addReport = async (req, res) => {
  const creator = req.user
  const { reportedUser, description } = req.body

  if (!description) {
    return res
      .status(400)
      .send({ message: 'Report must contain a description' })
  }

  const user = await User.findById(reportedUser._id)

  if (!user) {
    return res.status(404).send({ message: "Reported user doesn't exist" })
  }

  const report = {
    sender: { _id: creator._id, name: creator.name },
    reportedUser,
    description,
  }

  const newReport = new Report(report)

  try {
    await newReport.save()
    res.status(200).send(newReport)
  } catch (error) {
    res.status(409).send({ message: error })
  }
}

export const closeReport = async (req, res) => {
  const reportId = req.params.id

  if (!mongoose.Types.ObjectId.isValid(reportId)) {
    return res.status(400).send({ message: 'Invalid report Id' })
  }

  try {
    const updatedReport = await Report.findByIdAndUpdate(reportId, {
      isClosed: true,
    })
    res.status(200).send(updatedReport)
  } catch (error) {
    res.status(409).send({ message: error })
  }
}
