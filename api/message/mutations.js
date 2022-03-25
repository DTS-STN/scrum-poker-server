import { messages, addMessage, updateMessage, deleteMessage } from "../../datasets/messages.js";
import { pubsub } from "../graphql/pubsub.js";

export default {
  //
  addMessage: async (_, { roomId, name, content }, context) => {
    const Message = addMessage(roomId, name, content);
    if (Message) {
      pubsub.publish(['MESSAGES'], { messages: messages })
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
  updateMessage: async (_, { roomId, id, content }, context) => {
    if (updateMessage(roomId, id, content)) {

      pubsub.publish(['MESSAGES'], { messages: messages })

      return { success: true, message: "Message updated" };
    } else {
      return { success: false, message: "Failed to update Message" };
    }
  },
  //
  deleteMessage: async (_, { roomId, id }) => {
    if (deleteMessage(roomId, id)) {

      pubsub.publish(['MESSAGES'], { messages: messages })

      return { success: true, message: "Message deleted" };
    } else {
      return { success: false, message: "Failed to delete Message" };
    }
  },
};
