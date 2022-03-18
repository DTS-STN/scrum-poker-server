import { addUser, updateUser, deleteUser } from "../../datasets/users.js";

export default {
  addUser: async (_, { name }) => {
    const user = addUser(name);
    if (user) {
      return { success: true, message: "User added", id: user.id };
    } else {
      return { success: false, message: "Failed to add user" };
    }
  },
  updateUser: async (_, { id, name }) => {
    if (updateUser(id, name)) {
      return { success: true, message: "User updated" };
    } else {
      return { success: false, message: "Failed to update user" };
    }
  },
  deleteUser: async (_, { id }) => {
    if (deleteUser(id)) {
      return { success: true, message: "User deleted" };
    } else {
      return { success: false, message: "Failed to delete user" };
    }
  },
};
