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
  created_at: Date

  @OneToOne(() => Message)
  @JoinColumn()
  recent_message: Message

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[]

  @ManyToOne(() => User, (user) => user.owned_groups)
  owner: User

  @ManyToMany(() => User)
  @JoinTable({
    name: 'chats_users',
    joinColumn: {
      name: 'chat_id',
    },
    inverseJoinColumn: {
      name: 'user_id',
    },
  })
  members: User[]
}
