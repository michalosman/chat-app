import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/User.js'
import ApiError from '../error/ApiError.js'
import 'express-async-errors'

dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY

export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  if (!firstName || !lastName || !email || !password)
    throw ApiError.badRequest('Data incomplete')

  const doesExist = Boolean(await User.findOne({ email }))
  if (doesExist) throw ApiError.badRequest('Account already exists')

  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = new User({
    name: firstName + ' ' + lastName,
    email,
    password: hashedPassword,
  })

  await newUser.save()

  const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '7d' })
  const { _id: id, password: remove, ...userData } = newUser._doc

  res.status(200).json({ ...userData, id, token })
}

export const signIn = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user) throw ApiError.notFound('User not found')

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw ApiError.badRequest('Wrong password')

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '7d' })
  const { _id: id, password: remove, ...userData } = user._doc

  res.status(200).json({ ...userData, id, token })
}

export const warnUser = async (req, res) => {
  const { userId } = req.params

  const user = await User.findById(userId)
  if (!user) throw ApiError.notFound('User not found')

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      warnings: user.warnings + 1,
    },
    { new: true }
  )

  res
    .status(200)
    .json({ name: updatedUser.name, warnings: updatedUser.warnings })
}

export const blockUser = async (req, res) => {
  const { userId } = req.params

  const user = await User.findById(userId)
  if (!user) throw ApiError.notFound('User not found')

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      isBlocked: true,
    },
    { new: true }
  )

  res
    .status(200)
    .json({ name: updatedUser.name, isBlocked: updatedUser.isBlocked })
}

export const unblockUser = async (req, res) => {
  const { userId } = req.params

  const user = await User.findById(userId)
  if (!user) throw ApiError.notFound('User not found')

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      isBlocked: false,
    },
    { new: true }
  )

  res
    .status(200)
    .json({ name: updatedUser.name, isBlocked: updatedUser.isBlocked })
}

export const getUsers = async (req, res) => {
  const users = await User.find()

  const usersData = users.map((user) => {
    const { _id: id, password: remove, ...userData } = user._doc
    return { ...userData, id }
  })

  res.status(200).json(usersData)
}

export const validateUser = (req, res) => {
  res.status(200).json({ isValid: req.body.role === req.user.role })
}
