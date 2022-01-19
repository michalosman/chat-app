import { User } from './User'
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm'

@Entity()
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
  creator: User

  @ManyToOne(() => User, (user) => user.received_reports)
  reported: User

  @ManyToOne(() => User, (user) => user.managed_reports, {
    nullable: true,
  })
  moderator: User
}
