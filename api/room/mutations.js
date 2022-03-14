import {
  addRoom,
  updateRoom,
  deleteRoom,
  addUserToRoom,
} from "../../datasets/rooms.js";

export default {
  addRoom: async (_, { host }) => {
    const room = addRoom(host);
    console.log(room);
    if (room) {
      return { success: true, message: "Room added", id: room.id };
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
