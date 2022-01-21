import ApiError from '../error/ApiError'
import { Report } from '../models/Report'
import { User } from '../models/User'
import 'express-async-errors'
import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

export const getReports = async (req: Request, res: Response) => {
  const reports = await getRepository(Report)
    .createQueryBuilder('reports')
    .innerJoinAndSelect('reports.sender', 'sender')
    .innerJoinAndSelect('reports.reported', 'reported')
    .leftJoinAndSelect('reports.moderator', 'moderator')
    .getMany()

  const reportsData = reports.map((report) => {
    const { is_closed: isClosed, created_at: createdAt, ...reportData } = report

    return {
      ...reportData,
      sender: { id: report.sender.id, name: report.sender.name },
      reported: { id: report.reported.id, name: report.reported.name },
      moderator: report.moderator
        ? { id: report.reported.id, name: report.reported.name }
        : null,
      isClosed,
      createdAt,
    }
  })

  res.status(200).json(reportsData)
}

export const createReport = async (req: Request, res: Response) => {
  const sender = req.user
  const { reportedId, description } = req.body

  const reported = await User.findOne(reportedId)

  if (!reported) throw ApiError.notFound('Reported user not found')
  if (!description) throw ApiError.badRequest('No description provided')

  const newReport = new Report()
  newReport.description = description
  newReport.sender = sender
  newReport.reported = reported
  await newReport.save()

  res.status(200).json({ id: newReport.id, createdAt: newReport.created_at })
}

export const closeReport = async (req: Request, res: Response) => {
  const moderator = req.user
  const { reportId } = req.params

  const report = await Report.findOne(reportId)

  if (!report) throw ApiError.notFound('Report not found')
  if (report.is_closed) throw ApiError.badRequest('Report is already closed')

  report.is_closed = true
  report.moderator = moderator
  await report.save()

  res.status(200).json({ id: report.id, isClosed: report.is_closed })
}
