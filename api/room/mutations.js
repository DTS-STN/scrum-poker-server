import {
  addRoom,
  updateRoom,
  deleteRoom,
  addUserToRoom,
} from "../../datasets/rooms.js";

import { addUser } from "../../datasets/users.js";

export default {
  addRoom: async (_, { name }) => {
    const userHost = addUser(name);
    const room = addRoom(userHost);
    if (room) {
      return {
        success: true,
        message: "Room added",
        id: room.id,
        userID: userHost.id,
      };
    } else {
      return { success: false, message: "Failed to add room" };
    }
  },
  updateRoom: async (_, { id, users }) => {
    if (updateRoom(id, users)) {
      return { success: true, message: "Room updated" };
    } else {
      return { success: false, message: "Failed to update room" };
    }
  },
  deleteRoom: async (_, { id }) => {
    if (deleteRoom(id)) {
      return { success: true, message: "Room deleted" };
    } else {
      return { success: false, message: "Failed to delete room" };
    }
  },
  addUserToRoom: async (_, { roomID, userID }) => {
    if (addUserToRoom(roomID, userID)) {
      return { success: true, message: "User added" };
    } else {
      return { success: false, message: "Failed to add user" };
    }
  },
};
