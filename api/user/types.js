const UserFields = `
  id: ID!
  name: String
`;

const UserQueries = `
  users(id: ID): [User]
`;

const UserMutations = `
  addUser(name: String): Response
  updateUser(id: ID!, name: String): Response
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
  }`;
