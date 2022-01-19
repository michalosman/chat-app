import { Chat } from './Chat'
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm'
import { User } from './User'

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 255,
  })
  text: string

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => User, (user) => user.messages)
  sender: User

  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat: Chat
}
