import { Message } from './../models/Message'
import { getRepository } from 'typeorm'
import { Chat, ChatType } from '../models/Chat'
import { User, UserRole } from '../models/User'
import ApiError from '../error/ApiError'
import 'express-async-errors'
import { Request, Response } from 'express'

// TODO - Refactor to use queries instead of array methods

export const getChats = async (req: Request, res: Response) => {
  const user = req.user

  const chats = await getRepository(Chat)
    .createQueryBuilder('chats')
    .innerJoinAndSelect('chats.members', 'members')
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

  if (!chatId) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(chatId)) throw ApiError.badRequest('Invalid chat id')

  const chat = await getRepository(Chat)
    .createQueryBuilder('chats')
    .innerJoinAndSelect('chats.members', 'members')
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

  if (!email) throw ApiError.badRequest('Request data incomplete')
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
    .innerJoinAndSelect('chats.members', 'members')
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

  if (!name) throw ApiError.badRequest('Request data incomplete')

  const newGroup = new Chat()
  newGroup.owner = user
  newGroup.name = name
  newGroup.members = [user]
  newGroup.type = ChatType.GROUP
  await newGroup.save()

  res.status(200).json(newGroup)
}

export const addMember = async (req: Request, res: Response) => {
  const user = req.user
  const { chatId } = req.params
  const { email } = req.body

  if (!chatId || !email) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(chatId)) throw ApiError.badRequest('Invalid chat id')

  const chat = await getRepository(Chat)
    .createQueryBuilder('chats')
    .innerJoinAndSelect('chats.members', 'members')
    .innerJoinAndSelect('chats.owner', 'owner')
    .where('chats.id = :chatId', { chatId })
    .getOne()

  if (!chat) throw ApiError.notFound('Chat not found')
  if (chat.type !== ChatType.GROUP)
    throw ApiError.badRequest('Chat must be of type group')
  if (chat.owner.id !== user.id)
    throw ApiError.methodNotAllowed(
      'Only group owner can perform this operation'
    )

  const newMember = await User.findOne({ email })
  if (!newMember) throw ApiError.notFound('User not found')

  const isMember = chat.members.find((member) => member.id === newMember.id)
  if (isMember) throw ApiError.methodNotAllowed('User is already a member')

  chat.members = [...chat.members, newMember]
  await chat.save()

  res.status(200).json({
    members: [
      chat.members.map((member) => {
        return { id: member.id, name: member.name }
      }),
    ],
  })
}

export const leaveGroup = async (req: Request, res: Response) => {
  const user = req.user
  const { chatId } = req.params

  if (!chatId) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(chatId)) throw ApiError.badRequest('Invalid chat id')

  const chat = await getRepository(Chat)
    .createQueryBuilder('chats')
    .innerJoinAndSelect('chats.members', 'members')
    .innerJoinAndSelect('chats.owner', 'owner')
    .where('chats.id = :chatId', { chatId })
    .getOne()

  if (!chat) throw ApiError.notFound('Chat not found')
  if (chat.type !== ChatType.GROUP)
    throw ApiError.badRequest('Chat must be of type group')
  if (chat.owner.id === user.id)
    throw ApiError.methodNotAllowed('Group owner cannot perform this operation')

  const isMember = chat.members.find((member) => member.id === user.id)
  if (!isMember)
    throw ApiError.methodNotAllowed('User must be a member of group')

  chat.members = [...chat.members.filter((member) => member.id !== user.id)]
  await chat.save()

  res.status(200).json({
    members: [
      chat.members.map((member) => {
        return { id: member.id, name: member.name }
      }),
    ],
  })
}

export const deleteChat = async (req: Request, res: Response) => {
  const user = req.user
  const { chatId } = req.params

  if (!chatId) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(chatId)) throw ApiError.badRequest('Invalid chat id')

  const chat = await getRepository(Chat)
    .createQueryBuilder('chats')
    .innerJoinAndSelect('chats.members', 'members')
    .where('chats.id = :chatId', { chatId })
    .getOne()

  if (!chat) throw ApiError.notFound('Chat not found')
  if (chat.type === ChatType.GROUP) {
    if (chat.owner.id !== user.id)
      throw ApiError.forbidden('Only group owner can perform this operation')
  } else {
    const isMember = chat.members.find((member) => member.id === user.id)
    if (!isMember)
      throw ApiError.forbidden('Only chat member can perform this operation')
  }

  await chat.remove()

  res.status(200).json({ message: 'Chat deleted successfully' })
}

export const createMessage = async (req: Request, res: Response) => {
  const user = req.user
  const { chatId } = req.params
  const { text } = req.body

  if (!chatId || !text) throw ApiError.badRequest('Request data incomplete')
  if (!parseInt(chatId)) throw ApiError.badRequest('Invalid chat id')

  const chat = await getRepository(Chat)
    .createQueryBuilder('chats')
    .innerJoinAndSelect('chats.members', 'members')
    .where('chats.id = :chatId', { chatId })
    .getOne()

  if (!chat) throw ApiError.notFound('Chat not found')

  const isMember = chat.members.find((member) => member.id === user.id)
  if (!isMember) throw ApiError.forbidden('User is not a chat member')

  const newMessage = new Message()
  newMessage.sender = user
  newMessage.text = text
  newMessage.chat = chat
  await newMessage.save()

  chat.recent_message = newMessage
  await chat.save()

  res.status(200).json({ id: newMessage.id, createdAt: newMessage.created_at })
}
