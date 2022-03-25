import { pubsub } from "../graphql/pubsub.js";
import { withFilter } from "graphql-subscriptions";

export default {
    roomShowHideCardChanged: {
        subscribe: withFilter(
            () => pubsub.asyncIterator("ROOM_SHOW_HIDE_CARD_CHANGED"),
            (payload, variables) => {
                 // Only push an update if the user is added to the room subscribed to
                 //return payload.userModified.room === variables.room;
                console.log('payload', payload, 'variables', variables)
                return payload.roomShowHideCardChanged.id === variables.room;
                //return true
            }
        ),
    },
};
