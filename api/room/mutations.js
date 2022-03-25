import {
  addRoom,
  updateRoom,
  deleteRoom,
  addUserToRoom,
  showHideRoomCard
} from "../../datasets/rooms.js";
import { pubsub } from "../graphql/pubsub.js";


export default {
  addRoom: async (_, { userid }) => {
    const room = addRoom(userid);
    if (room) {
      return {
        success: true,
        message: "Room added",
        id: room.id,
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
  addUserToRoom: async (_, { roomid, userid }) => {
    if (addUserToRoom(roomid, userid)) {
      return { success: true, message: "User added" };
    } else {
      return { success: false, message: "Failed to add user" };
    }
  },
  showHideRoomCard: async (_, { roomId, isShown }) => {
    const room = showHideRoomCard(roomId, isShown);
    if (room) {
      pubsub.publish("ROOM_SHOW_HIDE_CARD_CHANGED", {
        roomShowHideCardChanged: room,
      });
      return { success: true, message: `Card is ${isShown ? 'shown' : 'hidden'}`  };
    } else {
      return { success: false, message: "Failed to change card status" };
    }
  }

};
