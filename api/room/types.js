const RoomFields = `
  id: ID!
  host: User
  users: [User]
  isShown: Boolean!
`;

const RoomQueries = `
  rooms(id: ID): [Room]
`;

const RoomMutations = `
  addRoom(host: ID!): Response
  updateRoom(id: ID!, users: [ID]): Response
  deleteRoom(id: ID!): Response
  addUserToRoom(userID: ID!, roomID: ID!) : Response
`;

export default `
  type Room {
    ${RoomFields}
  }
  type Query{
    ${RoomQueries}
  }

  type Mutation{
    ${RoomMutations}
  }`;
