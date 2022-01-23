import Chat from '../models/Chat.js'
import User from '../models/User.js'
import mongoose from 'mongoose'
import ApiError from '../error/ApiError.js'
import 'express-async-errors'

export const getChats = async (req, res) => {
  const user = req.user
  const chats = await Chat.find({ 'members._id': user._id })
  res.status(200).json(chats)
}

export const getChat = async (req, res) => {
  const user = req.user
  const { chatId } = req.params

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  const userId = mongoose.Types.ObjectId(user._id).toString()
  const isMember = chat.members.find((member) => member._id === userId)
  if (!isMember) throw ApiError.forbidden('User is not a chat member')

  res.status(200).json(chat)
}

export const createPrivateChat = async (req, res) => {
  const creator = req.user
  const { email } = req.body

  if (email === creator.email)
    throw ApiError.methodNotAllowed(
      'Cannot create a chat with your own account'
    )

  const user = await User.findOne({ email })
  if (!user) throw ApiError.notFound('User not found')
  if (user.role !== 'user')
    throw ApiError.methodNotAllowed('Creating such chat is not allowed')

  const doesChatExist = await Chat.findOne({
    type: 'private',
    'members._id': { $all: [creator._id, user._id] },
  })
  if (doesChatExist) throw ApiError.methodNotAllowed('Chat already exists')

  const newChat = new Chat({
    members: [
      {
        _id: creator._id,
        name: creator.name,
      },
      {
        _id: user._id,
        name: user.name,
      },
    ],
  })

  await newChat.save()

  res.status(200).json(newChat)
}

export const createGroupChat = async (req, res) => {
  const owner = req.user
  const { name } = req.body

  if (!name) throw ApiError.notFound('Group chat must have a name')

  const newChat = new Chat({
    ownerId: owner._id,
    name,
    type: 'group',
    members: [
      {
        _id: owner._id,
        name: owner.name,
      },
    ],
  })

  await newChat.save()
  res.status(200).json(newChat)
}

export const addMember = async (req, res) => {
  const { chatId } = req.params
  const { email } = req.body

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  const newMember = await User.findOne({ email })
  if (!newMember) throw ApiError.notFound('User not found')

  const isMember = chat.members.find(
    (member) => member._id === mongoose.Types.ObjectId(newMember._id).toString()
  )
  if (isMember) throw ApiError.methodNotAllowed('User is already a member')

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { members: { _id: newMember._id, name: newMember.name } },
    },
    { new: true }
  )

  res.status(200).json(updatedChat.members)
}

export const leaveGroup = async (req, res) => {
  const user = req.user
  const { chatId } = req.params

  const chat = await Chat.findById(chatId)
  const userId = mongoose.Types.ObjectId(user._id).toString()
  if (chat.ownerId === userId)
    throw ApiError.methodNotAllowed('Group owner cannot perform this operation')

  const isMember = chat.members.find(
    (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
  )
  if (!isMember) throw ApiError.methodNotAllowed('User is not a group member')

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { members: { _id: user._id } },
    },
    { new: true }
  )

  res.status(200).json(updatedChat.members)
}

export const deleteChat = async (req, res) => {
  const user = req.user
  const { chatId } = req.params

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  if (chat.type === 'group') {
    if (chat.ownerId !== mongoose.Types.ObjectId(user._id).toString())
      throw ApiError.forbidden('Only group owner can perform this operation')
  } else {
    const isMember = chat.members.find(
      (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
    )
    if (!isMember)
      throw ApiError.forbidden('Only chat member can perform this operation')
  }

  await chat.remove()
  res.status(200).json({ message: 'Chat deleted successfully' })
}

export const createMessage = async (req, res) => {
  const user = req.user
  const { chatId } = req.params
  const { text } = req.body

  if (!text) throw ApiError.badRequest('Message must have text')

  const chat = await Chat.findById(chatId)
  if (!chat) throw ApiError.notFound('Chat not found')

  const isMember = chat.members.find(
    (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
  )
  if (!isMember) throw ApiError.forbidden('User is not a chat member')

  const message = {
    sender: {
      _id: user._id,
      name: user.name,
    },
    text,
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { messages: message },
      recentMessage: message,
    },
    { new: true }
  )

  res.status(200).json(updatedChat.recentMessage)
}
