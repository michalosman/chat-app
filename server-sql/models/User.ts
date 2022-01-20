import { Chat } from './Chat'
import { Message } from './Message'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm'
import { Report } from './Report'

enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    unique: true,
    length: 100,
  })
  email: string

  @Column({
    length: 60,
  })
  password: string

  @Column({
    length: 50,
  })
  name: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole

  @Column({
    default: 0,
  })
  warnings: number

  @Column({ default: false })
  is_blocked: boolean

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[]

  @OneToMany(() => Report, (report) => report.sender)
  sent_reports: Report[]

  @OneToMany(() => Report, (report) => report.reported)
  received_reports: Report[]

  @OneToMany(() => Report, (report) => report.moderator)
  managed_reports: Report[]

  @OneToMany(() => Chat, (chat) => chat.owner)
  owned_groups: Chat[]

  @ManyToMany(() => Chat)
  @JoinTable({
    name: 'users_chats',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'chat_id',
    },
  })
  chats: Chat[]
}
