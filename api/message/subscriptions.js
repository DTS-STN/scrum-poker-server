//
import { messages } from "../../datasets/messages.js";

export default {
  messages: {
    subscribe: (parent, args, { pubsub }) => {
      setTimeout(() => pubsub.publish(["MESSAGES"], { messages }), 0);
      return pubsub.asyncIterator(["MESSAGES"]);
    },
  },
};
