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
} from 'typeorm'

enum ChatType {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

@Entity()
export class Chat {
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
