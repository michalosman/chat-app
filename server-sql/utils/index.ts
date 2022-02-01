import { User } from 'models/User'

export const getFullName = (user: User) => {
  return user.firstName + ' ' + user.lastName
}
