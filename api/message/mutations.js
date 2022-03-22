import {
  addMessage,
  updateMessage,
  deleteMessage,
} from "../../datasets/messages.js";

export default {
  //
  addMessage: async (_, { roomId, name, content }) => {
    const Message = addMessage(roomId, name, content);
    if (Message) {
      return {
        success: true,
        message: "Message added",
        id: Message.id,
      };
    } else {
      return { success: false, message: "Failed to add Message" };
    }
  },
  //
  updateMessage: async (_, { roomId, id, content }) => {
    if (updateMessage(roomId, id, content)) {
      return { success: true, message: "Message updated" };
    } else {
      return { success: false, message: "Failed to update Message" };
    }
  },
  //
  deleteMessage: async (_, { roomId, id }) => {
    if (deleteMessage(roomId, id)) {
      return { success: true, message: "Message deleted" };
    } else {
      return { success: false, message: "Failed to delete Message" };
    }
  },
};
