import gql from 'graphql-tag'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { subscriptions } from './pubsub.js'

//Object Schema Imports
import RoomTypes from '../room/types.js'
import RoomQueries from '../room/queries.js'
import RoomMutations from '../room/mutations.js'
import RoomResolvers from '../room/resolvers.js'

import UserTypes from '../user/types.js'
import UserQueries from '../user/queries.js'
import UserMutations from '../user/mutations.js'
import RoomSubscriptions from '../room/subscriptions.js'
import UserSubscriptions from '../user/subscriptions.js'

import MessageTypes from '../message/types.js'
import MessageQueries from '../message/queries.js'
import MessageMutations from '../message/mutations.js'
import MessageSubscriptions from '../message/subscriptions.js'

const schema = {
  typeDefs: gql`
    ${RoomTypes}
    ${UserTypes}
    ${MessageTypes}

    type Response {
      success: Boolean
      message: String
      id: ID
    }
  `,

  resolvers: {
    Query: {
      ...RoomQueries,
      ...UserQueries,
      ...MessageQueries,
    },
    Mutation: {
      ...RoomMutations,
      ...UserMutations,
      ...MessageMutations,
    },
    ...RoomResolvers,
    Subscription: {
      ...RoomSubscriptions,
      ...UserSubscriptions,
      ...MessageSubscriptions,
    },
  },

  subscriptions: subscriptions,
}

export default makeExecutableSchema(schema)
