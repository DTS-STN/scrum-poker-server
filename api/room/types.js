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
  addRoom(name: String): Response
  updateRoom(id: ID!, name: String): Response
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
