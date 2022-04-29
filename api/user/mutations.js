import { addUser, updateUser, deleteUser } from '../../datasets/users.js'
import { pubsub } from '../graphql/pubsub.js'

export default {
  addUser: async (_, { name, card, room, color }) => {
    const user = addUser(name, card, room, color)
    if (user) {
      pubsub.publish('USER_MODIFIED', {
        userModified: user,
      })
      return { success: true, message: 'User added', id: user.id }
    } else {
      return { success: false, message: 'Failed to add user' }
    }
  },
  updateUser: async (_, { userInput }) => {
    const user = updateUser(
      userInput.id,
      userInput.name,
      userInput.card,
      userInput.room
    )
    if (user) {
      pubsub.publish('USER_MODIFIED', {
        userModified: user,
      })
      return { success: true, message: 'User updated' }
    } else {
      return { success: false, message: 'Failed to update user' }
    }
  },
  deleteUser: async (_, { id }) => {
    if (deleteUser(id)) {
      return { success: true, message: 'User deleted' }
    } else {
      return { success: false, message: 'Failed to delete user' }
    }
  },
}
