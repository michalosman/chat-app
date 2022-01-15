import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/User.js'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = await User.findById(decoded.id)
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  if (req.user.isBlocked) {
    return res.status(401).json({ message: 'You are banned' })
  }
  next()
}

export const authModerator = (req, res, next) => {
  if (req.user.role !== 'moderator') {
    return res.status(403).json({ message: 'Access denied' })
  }
  next()
}

export const authAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' })
  }
  next()
}
