import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 255,
  })
  text: string

  @CreateDateColumn()
  created_at: Date
}
