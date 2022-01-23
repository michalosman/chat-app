import { Chat } from './Chat'
import { Message } from './Message'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm'
import { Report } from './Report'

export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
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
  isBlocked: boolean

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[]

  @OneToMany(() => Report, (report) => report.sender)
  sentReports: Report[]

  @OneToMany(() => Report, (report) => report.reported)
  receivedReports: Report[]

  @OneToMany(() => Report, (report) => report.moderator)
  managedReports: Report[]

  @OneToMany(() => Chat, (chat) => chat.owner)
  ownedGroups: Chat[]
}
