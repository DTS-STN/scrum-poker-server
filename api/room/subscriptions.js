import { pubsub } from "../graphql/pubsub.js";
import { withFilter } from "graphql-subscriptions";

export default {
  roomUpdated: {
    subscribe: withFilter(
      () => pubsub.asyncIterator("ROOM_UPDATED"),
      (payload, variables) => {
        // Only push an update if the user is currently in the room
        return payload.roomUpdated.id === variables.room;
      }
    ),
  },
};
