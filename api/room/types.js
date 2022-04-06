const TimerField = `
  timestamp: String
  duration: Int
  `
const RoomFields = `
  id: ID!
  host: User
  users: [User]
  isShown: Boolean!
  timer: Timer
`;

const RoomQueries = `
  rooms(id: ID): [Room]
`;

const RoomMutations = `
  addRoom(userid: ID!): Response
  updateRoom(id: ID!, users: [ID], isShown: Boolean!, timer: TimerInput): Response
  deleteRoom(id: ID!): Response
  addUserToRoom(userid: ID!, roomid: ID!) : Response
`;

export default `
  type Timer {
    ${TimerField}
  }

  input TimerInput{
    ${TimerField}
  }

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
