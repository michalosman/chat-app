import { getRepository } from 'typeorm'
import { Chat, ChatType } from '../models/Chat'
import { User, UserRole } from '../models/User'
import ApiError from '../error/ApiError'
import 'express-async-errors'
import { Request, Response } from 'express'

export const getChats = async (req: Request, res: Response) => {
  const user = req.user

  const chats = await getRepository(Chat)
    .createQueryBuilder('chats')
    .innerJoinAndSelect('chats.members', 'users')
    .where("chats.type = 'private'")
    .getMany()

  const userChats = chats.filter((chat) =>
    chat.members.find((member) => member.id === user.id)
  )

  res.status(200).json(userChats)
}

export const getChat = async (req: Request, res: Response) => {
  const user = req.user
  const { chatId } = req.params

  const chat = await getRepository(Chat)
    .createQueryBuilder('chats')
    .innerJoinAndSelect('chats.members', 'users')
    .where('chats.id = :chatId', { chatId })
    .getOne()

  if (!chat) throw ApiError.notFound('Chat not found')

  const isMember = chat.members.find((member) => member.id === user.id)

  if (!isMember) throw ApiError.forbidden('User is not a chat member')

  res.status(200).json(chat)
}

export const createPrivateChat = async (req: Request, res: Response) => {
  const creator = req.user
  const { email } = req.body

  if (email === creator.email)
    throw ApiError.methodNotAllowed(
      'Cannot create a chat with your own account'
    )

  const otherUser = await User.findOne({ email })
  if (!otherUser) throw ApiError.notFound('User not found')
  if (otherUser.role !== UserRole.USER)
    throw ApiError.methodNotAllowed('Creating such chat is not allowed')

  const chats = await getRepository(Chat)
    .createQueryBuilder('chats')
    .innerJoinAndSelect('chats.members', 'users')
    .where("chats.type = 'private'")
    .getMany()

  const doesChatExist = chats.find(
    (chat) =>
      chat.members.find((member) => member.id === creator.id) &&
      chat.members.find((member) => member.id === otherUser.id)
  )

  if (doesChatExist) throw ApiError.methodNotAllowed('Chat already exists')

  const newChat = new Chat()
  newChat.members = [creator, otherUser]
  newChat.type = ChatType.PRIVATE
  await newChat.save()

  res.json(newChat)
}

export const createGroupChat = async (req: Request, res: Response) => {
  const user = req.user
  const { name } = req.body

  if (!name) throw ApiError.notFound('Group chat must have a name')

  const newGroup = new Chat()
  newGroup.owner = user
  newGroup.name = name
  newGroup.members = [user]
  newGroup.type = ChatType.GROUP
  await newGroup.save()

  res.status(200).json(newGroup)
}

// TODO
export const addMember = async (req: Request, res: Response) => {
  // const { chatId } = req.params
  // const { email } = req.body
  // const chat = await Chat.findById(chatId)
  // if (!chat) throw ApiError.notFound('Chat not found')
  // const newMember = await User.findOne({ email })
  // if (!newMember) throw ApiError.notFound('User not found')
  // const isMember = chat.members.find(
  //   (member) => member._id === mongoose.Types.ObjectId(newMember._id).toString()
  // )
  // if (isMember) throw ApiError.methodNotAllowed('User is already a member')
  // const updatedChat = await Chat.findByIdAndUpdate(
  //   chatId,
  //   {
  //     $push: { members: { _id: newMember._id, name: newMember.name } },
  //   },
  //   { new: true }
  // )
  // res.status(200).json(updatedChat)
}

// TODO
export const leaveGroup = async (req: Request, res: Response) => {
  // const user = req.user
  // const { chatId } = req.params
  // const chat = Chat.findById(chatId)
  // const userId = mongoose.Types.ObjectId(user._id).toString()
  // if (chat.ownerId === userId)
  //   throw ApiError.methodNotAllowed('Group owner cannot perform this operation')
  // await Chat.findByIdAndUpdate(chatId, {
  //   $pull: { members: { _id: user._id } },
  // })
  // res.status(200).json({ message: 'Chat left successfully' })
}

// TODO
export const deleteChat = async (req: Request, res: Response) => {
  // const user = req.user
  // const { chatId } = req.params
  // const chat = await Chat.findById(chatId)
  // if (!chat) throw ApiError.notFound('Chat not found')
  // if (chat.type === 'group') {
  //   if (chat.ownerId !== mongoose.Types.ObjectId(user._id).toString())
  //     throw ApiError.forbidden('Only group owner can perform this operation')
  // } else {
  //   const isMember = chat.members.find(
  //     (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
  //   )
  //   if (!isMember)
  //     throw ApiError.forbidden('Only chat member can perform this operation')
  // }
  // await chat.remove()
  // res.status(200).json({ message: 'Chat deleted successfully' })
}

// TODO
export const createMessage = async (req: Request, res: Response) => {
  // const user = req.user
  // const { chatId } = req.params
  // const { text } = req.body
  // if (!text) throw ApiError.badRequest('Message must have text')
  // const chat = await Chat.findById(chatId)
  // if (!chat) throw ApiError.notFound('Chat not found')
  // const isMember = chat.members.find(
  //   (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
  // )
  // if (!isMember) throw ApiError.forbidden('User is not a chat member')
  // const message = {
  //   sender: {
  //     _id: user._id,
  //     name: user.name,
  //   },
  //   text,
  // }
  // const updatedChat = await Chat.findByIdAndUpdate(
  //   chatId,
  //   {
  //     $push: { messages: message },
  //     recentMessage: message,
  //   },
  //   { new: true }
  // )
  // res.status(200).json(updatedChat)
}

// TODO
// - Refactor to use queries instead of array methods
