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
  addRoom(userid: ID!): Response
  updateRoom(id: ID!, users: [ID], isShown: Boolean!): Response
  deleteRoom(id: ID!): Response
  addUserToRoom(userid: ID!, roomid: ID!) : Response
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
  }
  
  type Subscription{
    roomUpdated(room: ID!): Room
  }
  `;
