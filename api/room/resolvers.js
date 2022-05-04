import { getUserByID } from '../../datasets/users.js'

export default {
  Room: {
    host: (user) => {
      return getUserByID(user.host)
    },
    users: (user) => {
      return user.users.map((x) => getUserByID(x))
    },
  },
}
