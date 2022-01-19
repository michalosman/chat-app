import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm'

enum ChatType {
  PRIVATE = 'private',
  PUBLIC = 'public',
}

@Entity('chats')
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
}
