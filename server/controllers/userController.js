import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/User.js'
import mongoose from 'mongoose'

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY

export const signUp = async (req, res) => {
  const { email, password, name } = req.body

  if (!email || !password || !name)
    return res.status(400).json({ message: 'New user data incomplete' })

  try {
    const doesExist = Boolean(await User.findOne({ email }))

    if (doesExist)
      return res.status(400).json({ message: 'Account already exists' })

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
    })

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: '7d' })

    const { password: remove, ...userData } = newUser._doc

    res.status(200).json({ ...userData, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const signIn = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Password incorrect' })
    }

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '7d' })

    const { password: remove, ...userData } = user._doc

    res.status(200).json({ ...userData, token })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const warnUser = async (req, res) => {
  const { userId } = req.params

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ message: 'Invalid user id' })

  try {
    const user = await User.findById(userId)

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        warningsCount: user.warningsCount + 1,
      },
      { new: true }
    )

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const blockUser = async (req, res) => {
  const { userId } = req.params

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ message: 'Invalid user id' })

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: true,
      },
      { new: true }
    )

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const unblockUser = async (req, res) => {
  const { userId } = req.params

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(400).json({ message: 'Invalid user id' })

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: false,
      },
      { new: true }
    )

    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const validateUser = (req, res) => {
  return res.status(200).json({ isValid: req.body.role === req.user.role })
}
