import { getUsers, getUserByID } from '../../datasets/users.js'

export default {
  users: (_, { id }) => {
    return id ? [getUserByID(id)] : getUsers()
  },
}
