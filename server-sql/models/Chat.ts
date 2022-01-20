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
} from 'typeorm'

enum ChatType {
  PRIVATE = 'private',
  PUBLIC = 'public',
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
}
