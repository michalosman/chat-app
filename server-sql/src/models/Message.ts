import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Chat } from './Chat'
import { User } from './User'

@Entity('messages')
class Message extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({
    length: 255,
  })
  text: string

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => User, (user) => user.messages)
  sender: User

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  chat: Chat
}

export default Message
