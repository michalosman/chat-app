import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/User.js'
import mongoose from 'mongoose'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

export const signUp = async (req, res) => {
  const { email, password, name } = req.body

  const doesExist = Boolean(await User.findOne({ email }))

  if (doesExist) {
    return res.status(400).json({ message: 'User already exists.' })
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
  })

  const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '1h' })

  const { password: remove, ...userData } = newUser._doc

  res.status(200).json({ ...userData, token })
}

export const signIn = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: "User doesn't exist." })
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Password incorrect.' })
  }

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' })

  const { password: remove, ...userData } = user._doc

  res.status(200).json({ ...userData, token })
}

export const warnUser = async (req, res) => {
  const userId = req.params.userId

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send('No user with given id')

  const user = await User.findById(userId)

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      warningsCount: user.warningsCount + 1,
    },
    { new: true }
  )

  res.json(updatedUser)
}

export const blockUser = async (req, res) => {
  const userId = req.params.userId

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send('No user with given id')

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      isBlocked: true,
    },
    { new: true }
  )

  res.json(updatedUser)
}

export const unblockUser = async (req, res) => {
  const userId = req.params.userId

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).send('No user with given id')

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      isBlocked: false,
    },
    { new: true }
  )

  res.json(updatedUser)
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

export const validateUser = (req, res) => {
  return res.status(200).send({ isValid: req.body.role === req.user.role })
}
