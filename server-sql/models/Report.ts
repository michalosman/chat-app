import { User } from './User'
import {
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from 'typeorm'

@Entity('reports')
export class Report extends BaseEntity{
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number

  @Column({
    length: 255,
  })
  description: string

  @Column({
    default: false,
  })
  isClosed: boolean

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => User, (user) => user.sentReports)
  sender: User

  @ManyToOne(() => User, (user) => user.receivedReports)
  reported: User

  @ManyToOne(() => User, (user) => user.managedReports, {
    nullable: true,
  })
  moderator: User
}
