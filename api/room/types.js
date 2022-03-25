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
  updateRoom(id: ID!, users: [ID]): Response
  deleteRoom(id: ID!): Response
  addUserToRoom(userid: ID!, roomid: ID!) : Response
  showHideRoomCard(roomId: ID!, isShown: Boolean!) : Response
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
    roomShowHideCardChanged(room: ID): Room
  }
  `;
