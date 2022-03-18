import { pubsub } from "../graphql/pubsub.js";

export default {
  userAdded: {
    subscribe: () => pubsub.asyncIterator(["USER_ADDED"]),
  },
};
