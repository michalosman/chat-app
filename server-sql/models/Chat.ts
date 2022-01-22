import { User } from './User'
import { Message } from './Message'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
  ManyToMany,
  JoinTable,
} from 'typeorm'

export enum ChatType {
  PRIVATE = 'private',
  GROUP = 'group',
}

@Entity('chats')
export class Chat extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100,
    nullable: true,
  })
  name: string

  @Column({
    type: 'enum',
    enum: ChatType,
  })
  type: ChatType

  @CreateDateColumn()
  createdAt: Date

  @OneToOne(() => Message)
  @JoinColumn()
  recentMessage: Message

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[]

  @ManyToOne(() => User, (user) => user.ownedGroups)
  owner: User

  @ManyToMany(() => User)
  @JoinTable({
    name: 'chats_users',
    joinColumn: {
      name: 'chatId',
    },
    inverseJoinColumn: {
      name: 'userId',
    },
  })
  members: User[]
}
