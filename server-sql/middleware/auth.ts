import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User, UserRole } from '../models/User'
import { Request, Response, NextFunction } from 'express'
import ApiError from '../error/ApiError'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY || ''

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) throw ApiError.badRequest('Token not provided')

  const decoded = jwt.verify(token, SECRET_KEY)

  if (typeof decoded === 'string') throw ApiError.badRequest('Invalid token')

  const user = await User.findOne({ id: decoded?.id })

  if (!user) return res.status(401).json({ message: 'Account not found' })

  if (user.is_blocked)
    return res.status(403).json({ message: 'Account is blocked' })

  req.user = user
  next()
}

export const authModerator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== UserRole.MODERATOR)
    throw ApiError.forbidden('Access denied (moderator only)')

  next()
}

export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== UserRole.ADMIN)
    throw ApiError.forbidden('Access denied (admin only)')

  next()
}
