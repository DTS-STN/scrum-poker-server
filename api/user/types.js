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
  updateUser(id: ID!, name: String, card: Int, room: ID): Response
  deleteUser(id: ID!): Response
`;

export default `
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
