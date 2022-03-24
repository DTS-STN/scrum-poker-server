import { pubsub } from "../graphql/pubsub.js";
import { withFilter } from "graphql-subscriptions";

export default {
  userModified: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("USER_MODIFIED"),
      (payload, variables) => {
        // Only push an update if the user is added to the room subscribed to
        return payload.userModified.room === variables.room;
      }
    ),
  },
};
