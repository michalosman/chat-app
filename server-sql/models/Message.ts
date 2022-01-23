import { Chat } from './Chat'
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm'
import { User } from './User'

@Entity('messages')
export class Message extends BaseEntity {
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
