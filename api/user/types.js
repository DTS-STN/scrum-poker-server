const UserFields = `
  id: ID!
  name: String
  card: Int
  room: ID
`;

const UserQueries = `
  users(id: ID): [User]
`;

const UserMutations = `
  addUser(name: String, card: Int, room: ID): Response
  updateUser(userInput: UserInput): Response
  deleteUser(id: ID!): Response
`;

export default `
  input UserInput{
    ${UserFields}
  }
  type User {
    ${UserFields}
  }
  type Query{
    ${UserQueries}
  }
  type Mutation{
    ${UserMutations}
  }
  type Subscription{
    userModified(room: ID): User
  }`;
