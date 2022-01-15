import Chat from '../models/Chat.js'
import User from '../models/User.js'
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
  const user = req.user
  const { chatId } = req.params

  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(404).json({ message: 'No chat with given id' })
  }

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

export const createPrivateChat = async (req, res) => {
  const creator = req.user
  const { email } = req.body

  if (email === creator.email) {
    return res.status(400).json({ message: 'Cannot create chat' })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" })
    }

    const doesChatExist = await Chat.findOne({
      type: 'private',
      'members._id': { $all: [creator._id, user._id] },
    })

    if (doesChatExist) {
      return res.status(400).json({ message: 'Chat already exists' })
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

    await newChat.save()
    res.status(200).json(newChat)
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const createGroupChat = async (req, res) => {
  const owner = req.user
  const { name } = req.body

  try {
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
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const addMember = async (req, res) => {
  const owner = req.user
  const { chatId } = req.params
  const { email } = req.body

  if (email !== owner.email) {
    return res.status(400).json({ message: 'Cannot perform operation' })
  }

  if (!mongoose.Types.ObjectId.isValid(chatId))
    return res.status(404).json({ message: 'No chat with given id' })

  try {
    const chat = await Chat.findById(chatId)

    const newMember = await User.findOne({ email })

    if (!newMember) {
      return res.status(404).json({ message: "User doesn't exist" })
    }

    const isMember = chat.members.find(
      (member) =>
        member._id === mongoose.Types.ObjectId(newMember._id).toString()
    )

    if (isMember) {
      return res.status(404).json({ message: 'User is already a member' })
    }

    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { members: { _id: newMember._id, name: newMember.name } },
      },
      { new: true }
    )
    res.status(200).json(updatedChat)
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const leaveChat = async (req, res) => {
  const user = req.user
  const { chatId } = req.params

  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(400).json({ message: 'Invalid chat Id' })
  }

  try {
    const chat = Chat.findById(chatId)

    if (chat.ownerId === mongoose.Types.ObjectId(user._id).toString()) {
      return res
        .status(400)
        .json({ message: 'Group owner cannot perform this operation' })
    }

    await Chat.findByIdAndUpdate(chatId, {
      $pull: { members: { _id: user._id } },
    })
    res.status(200).json({ message: 'Chat left successfully' })
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const deleteChat = async (req, res) => {
  const user = req.user
  const { chatId } = req.params

  if (!mongoose.Types.ObjectId.isValid(chatId))
    return res.status(404).json({ message: 'No chat with given id' })

  try {
    const chat = await Chat.findById(chatId)

    if (chat.type === 'group') {
      if (!chat.ownerId === mongoose.Types.ObjectId(user._id).toString()) {
        return res
          .status(403)
          .json({ message: 'Only group owner can perform this operation' })
      }
    } else {
      const isMember = chat.members.find(
        (member) => member._id === mongoose.Types.ObjectId(user._id).toString()
      )

      if (!isMember) {
        return res
          .status(403)
          .json({ message: 'Only chat member can perform this operation' })
      }
    }

    await chat.remove()
    res.status(200).json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(409).json({ message: error })
  }
}

export const createMessage = async (req, res) => {
  const user = req.user
  const { chatId } = req.params
  const { text } = req.body

  if (!mongoose.Types.ObjectId.isValid(chatId))
    return res.status(404).json({ message: 'No chat with given id' })

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
