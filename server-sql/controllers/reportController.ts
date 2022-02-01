import ApiError from '../error/ApiError'
import { Report } from '../models/Report'
import { User } from '../models/User'
import 'express-async-errors'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { getFullName } from '../utils'

export const getReports = async (req: Request, res: Response) => {
  const reports = await getRepository(Report)
    .createQueryBuilder('reports')
    .innerJoinAndSelect('reports.sender', 'sender')
    .innerJoinAndSelect('reports.reported', 'reported')
    .leftJoinAndSelect('reports.moderator', 'moderator')
    .getMany()

  const reportsData = reports.map((report) => {
    return {
      ...report,
      sender: { id: report.sender.id, name: getFullName(report.sender) },
      reported: { id: report.reported.id, name: getFullName(report.reported) },
      moderator: report.moderator
        ? { id: report.reported.id, name: getFullName(report.reported) }
        : null,
    }
  })

  res.status(200).json(reportsData)
}

export const createReport = async (req: Request, res: Response) => {
  const sender = req.user
  const { reportedId, description } = req.body

  if (!reportedId || !description)
    throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(reportedId)) throw ApiError.badRequest('Invalid reported id')

  const reported = await User.findOne(reportedId)
  if (!reported) throw ApiError.notFound('Reported user not found')

  const newReport = new Report()
  newReport.description = description
  newReport.sender = sender
  newReport.reported = reported
  await newReport.save()

  res.status(200).json({ id: newReport.id, createdAt: newReport.createdAt })
}

export const closeReport = async (req: Request, res: Response) => {
  const moderator = req.user
  const { reportId } = req.params

  if (!reportId) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(reportId)) throw ApiError.badRequest('Invalid report id')

  const report = await Report.findOne(reportId)
  if (!report) throw ApiError.notFound('Report not found')
  if (report.isClosed) throw ApiError.badRequest('Report is already closed')

  report.isClosed = true
  report.moderator = moderator
  await report.save()

  res.status(200).json({ id: report.id, isClosed: report.isClosed })
}
