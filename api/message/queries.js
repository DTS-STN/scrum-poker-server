import { getMessages, getMessageByID } from "../../datasets/messages.js";

export default {
  messages: (_, { id }) => {
    return id ? [getMessageByID(id)] : getMessages();
  },
};
