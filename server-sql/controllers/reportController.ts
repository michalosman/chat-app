import ApiError from '../error/ApiError'
import { Report } from '../models/Report'
import { User } from '../models/User'
import 'express-async-errors'
import { Request, Response } from 'express'

export const getReports = async (req: Request, res: Response) => {
  // TODO - merge tables
  const reports = await Report.find()
  res.status(200).json(reports)
}

export const createReport = async (req: Request, res: Response) => {
  const sender = req.user
  const { reported, description } = req.body

  if (!description) throw ApiError.badRequest('No description')

  const user = await User.findOne({ id: reported.id })
  if (!user) throw ApiError.notFound('Reported user not found')

  const newReport = await Report.create({
    description,
    sender: {
      id: sender.id,
      name: sender.name,
    },
    reported: {
      id: reported.id,
      name: reported.name,
    },
  }).save()

  res.status(200).json(newReport)
}

export const closeReport = async (req: Request, res: Response) => {
  const moderator = req.user
  const reportId = parseInt(req.params.reportId)

  const report = await Report.findOne({ id: reportId })

  if (!report) throw ApiError.notFound('Report not found')

  report.moderator = moderator
  report.is_closed = true

  await report.save()
  res.status(200).json(report)
}
