import { User } from './User'
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 255,
  })
  description: string

  @Column({
    default: false,
  })
  is_closed: boolean

  @CreateDateColumn()
  created_at: Date

  @ManyToOne(() => User, (user) => user.created_reports)
  @JoinColumn({
    name: 'sender_id',
  })
  sender: User

  @ManyToOne(() => User, (user) => user.received_reports)
  @JoinColumn({
    name: 'reported_id',
  })
  reported: User

  @ManyToOne(() => User, (user) => user.managed_reports, {
    nullable: true,
  })
  @JoinColumn({
    name: 'moderator_id',
  })
  moderator: User
}
