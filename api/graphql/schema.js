import gql from "graphql-tag";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { subscriptions } from "./pubsub.js";

//Object Schema Imports
import RoomTypes from "../room/types.js";
import RoomQueries from "../room/queries.js";
import RoomMutations from "../room/mutations.js";
import RoomResolvers from "../room/resolvers.js";

import UserTypes from "../user/types.js";
import UserQueries from "../user/queries.js";
import UserMutations from "../user/mutations.js";

const schema = {
  typeDefs: gql`
    ${RoomTypes}
    ${UserTypes}

    type Response {
      success: Boolean
      message: String
      id: ID
      userID: ID
    }
  `,

  resolvers: {
    Query: {
      ...RoomQueries,
      ...UserQueries,
    },
    Mutation: {
      ...RoomMutations,
      ...UserMutations,
    },
    ...RoomResolvers,
  },

  subscriptions: subscriptions,
};

export default makeExecutableSchema(schema);
