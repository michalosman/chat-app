import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Report } from './Report'

enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  USER = 'user',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
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
  name: string

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
  is_blocked: boolean

  @OneToMany(() => Report, (report) => report.sender, { nullable: true })
  created_reports: Report[]

  @OneToMany(() => Report, (report) => report.sender, { nullable: true })
  received_reports: Report[]

  @OneToMany(() => Report, (report) => report.sender, { nullable: true })
  managed_reports: Report[]
}
