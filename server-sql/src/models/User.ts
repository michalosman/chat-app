import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Chat } from './Chat'
import Message from './Message'
import Report from './Report'

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
  firstName: string

  @Column({
    length: 50,
  })
  lastName: string

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
