import Chat from '../models/chatModel.js'
import User from '../models/userModel.js'
import mongoose from 'mongoose'

export const getChats = async (req, res) => {
  const user = req.user

  try {
    const chats = await Chat.find({ 'members._id': user._id })
    res.status(200).json(chats)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const getChat = async (req, res) => {
  const chatId = req.params.chatId
  const user = req.user

  if (!mongoose.Types.ObjectId.isValid(chatId))
    return res.status(404).send('No chat with given id')

  try {
    const chat = await Chat.findById(chatId)

    const isMember = chat.members.find(
      (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
    )

    if (!isMember) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    res.status(200).json(chat)
  } catch (error) {
    res.status(404).json({ message: error })
  }
}

export const addChat = async (req, res) => {
  const creator = req.user
  const { email } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(404).json({ message: "User doesn't exist" })
  }

  const doesChatExist = await Chat.findOne({
    'members._id': { $all: [creator._id, user._id] },
  })

  if (doesChatExist) {
    return res.status(400).json({ message: 'Chat already exists.' })
  }

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

  try {
    await newChat.save()
    res.status(200).json(newChat)
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const deleteChat = async (req, res) => {
  const user = req.user
  const chatId = req.params.chatId

  if (!mongoose.Types.ObjectId.isValid(chatId))
    return res.status(404).send('No chat with given id')

  try {
    const chat = await Chat.findById(chatId)

    const isMember = chat.members.find(
      (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
    )

    if (!isMember) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    await chat.remove()
    res.status(200).json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const addMessage = async (req, res) => {
  const user = req.user
  const chatId = req.params.chatId
  const { text } = req.body

  if (!mongoose.Types.ObjectId.isValid(chatId))
    return res.status(404).send('No chat with given id')

  try {
    const chat = await Chat.findById(chatId)

    const isMember = chat.members.find(
      (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
    )

    if (!isMember) {
      return res.status(403).json({ message: 'Forbidden' })
    }

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
      { new: true } // this flag decides if we get old doc or updated doc
    )

    res.status(200).json(updatedChat)
  } catch (error) {
    res.status(409).json({ message: error })
  }
}
