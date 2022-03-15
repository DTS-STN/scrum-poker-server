const RoomFields = `
  id: ID!
  name: String
`;

const RoomQueries = `
  rooms(id: ID): [Room]
`;

const RoomMutations = `
  addRoom(name: String): Response
  updateRoom(id: ID!, name: String): Response
  deleteRoom(id: ID!): Response
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
