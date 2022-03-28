import { pubsub } from "../graphql/pubsub.js";
import { withFilter } from "graphql-subscriptions";

export default {
    // roomShowHideCardChanged: {
    //     subscribe: withFilter(
    //         () => pubsub.asyncIterator("ROOM_SHOW_HIDE_CARD_CHANGED"),
    //         (payload, variables) => {
    //              // Only push an update if the user is currently in the room
    //             return payload.roomShowHideCardChanged.id === variables.room;
    //         }
    //     ),
    // },
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
