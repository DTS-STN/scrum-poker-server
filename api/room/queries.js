import { getRooms, getRoomByID } from "../../datasets/rooms.js";

export default {
  rooms: (_, { id }) => {
    return id ? [getRoomByID(id)] : getRooms();
  },
};
