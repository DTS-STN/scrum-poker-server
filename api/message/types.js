const MessageFields = `
  id: ID!
  name: String!
  content: String!
  edited: Boolean!
  roomId: ID!
`;

const MessageQueries = `
  messages: [Message!]
`;

const MessageMutations = `
  addMessage(roomId: ID!, name: String!, content: String!): Response
  updateMessage(roomId: ID!, id: ID!, content: String!): Response
  deleteMessage(roomId: ID!, id: ID!): Response
`;

export default `
  type Message {
    ${MessageFields}
  }

  type Query {
    ${MessageQueries}
  }

  type Mutation {
    ${MessageMutations}
  }
  
  type Subscription {
    messages: [Message!]
  }
  `;
