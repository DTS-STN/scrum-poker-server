import {
  addRoom,
  updateRoom,
  deleteRoom,
} from "../../datasets/rooms.js";

export default {
  addRoom: async (_, { name }) => {
    const room = addRoom(name)
    console.log(room)
    if (room) {
      return { success: true, message: "Room added", id: room.id };
    } else {
      return { success: false, message: "Failed to add room" };
    }
  },
  updateRoom: async (_, { id, name }) => {
    if (updateRoom(id, name)) {
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
};
