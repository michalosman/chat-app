import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { User } from '../models/User'
import ApiError from '../types/ApiError'
import 'express-async-errors'
import { Request, Response } from 'express'
import { getFullName } from '../utils'
import { SECRET_KEY } from '../config/constants'

export const signUp = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password)
    throw ApiError.badRequest('Request data incomplete')

  const doesExist = Boolean(await User.findOne({ email }))
  if (doesExist) throw ApiError.badRequest('Account already exists')

  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = new User()
  newUser.firstName = firstName
  newUser.lastName = lastName
  newUser.email = email
  newUser.password = hashedPassword
  await newUser.save()

  const { password: remove, ...userData } = newUser
  const name = getFullName(newUser)
  const token = jwt.sign({ id: newUser.id }, SECRET_KEY, {
    expiresIn: '7d',
  })

  res.status(200).json({ ...userData, name, token })
}

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email || !password) throw ApiError.badRequest('Request data incomplete')

  const user = await User.findOne({ email })
  if (!user) throw ApiError.notFound('User not found')

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw ApiError.badRequest('Wrong password')

  const { password: remove, ...userData } = user
  const name = getFullName(user)
  const token = jwt.sign({ id: user.id }, SECRET_KEY, {
    expiresIn: '7d',
  })

  res.status(200).json({ ...userData, name, token })
}

export const warnUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  if (!userId) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(userId)) throw ApiError.badRequest('Invalid user id')

  const user = await User.findOne(userId)
  if (!user) throw ApiError.notFound('User not found')

  user.warnings += 1
  await user.save()

  res.status(200).json({
    name: getFullName(user),
    warnings: user.warnings,
  })
}

export const blockUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  if (!userId) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(userId)) throw ApiError.badRequest('Invalid user id')

  const user = await User.findOne(userId)
  if (!user) throw ApiError.notFound('User not found')

  user.isBlocked = true
  await user.save()

  res.status(200).json({
    name: getFullName(user),
    isBlocked: user.isBlocked,
  })
}

export const unblockUser = async (req: Request, res: Response) => {
  const { userId } = req.params

  if (!userId) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(userId)) throw ApiError.badRequest('Invalid user id')

  const user = await User.findOne(userId)
  if (!user) throw ApiError.notFound('User not found')

  user.isBlocked = false
  await user.save()

  res.status(200).json({
    name: getFullName(user),
    isBlocked: user.isBlocked,
  })
}

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find()

  const usersData = users.map((user) => {
    const { password: remove, ...userData } = user
    return { ...userData, name: getFullName(user) }
  })

  res.status(200).json(usersData)
}

export const validateUser = (req: Request, res: Response) => {
  res.status(200).json({ isValid: req.body.role === req.user.role })
}
