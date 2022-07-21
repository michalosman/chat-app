import { User } from '../models/User'

// eslint-disable-next-line import/prefer-default-export
export const getFullName = (user: User) => {
  return `${user.firstName} ${user.lastName}`
}
