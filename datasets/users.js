let users = [
  {
    id: 1,
    name: "Tommy",
    card: 3,
  },
  {
    id: 2,
    name: "Ben",
    card: null,
  },
];

function getUsers() {
  return users;
}

function getUserByID(id) {
  return users.find((user) => user.id === id);
}

function addUser(name) {
  //Generate ids until a unique id is found
  let id = Math.random().toString(10).slice(-5);
  while (getUserByID(id) !== undefined) {
    id = Math.random().toString(10).slice(-5);
  }
  const user = {
    id: id,
    name: name,
    card: null,
  };
  users.push(user);
  return user;
}

function updateUser(id, name) {
  let user = getUserByID(id);
  if (user) {
    user.name = name;
    return true;
  }
  return false;
}

function deleteUser(id) {
  if (getUserByID(id) == undefined) {
    //User with given ID Does Not Exist
    return false;
  }

  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);
  return true;
}

export { getUsers, getUserByID, addUser, updateUser, deleteUser };
