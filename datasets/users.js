let users = [
  {
    id: 1,
    name: "Tommy",
    card: 3,
    room: "85723",
  },
  {
    id: 2,
    name: "Ben",
    card: null,
    room: "85723",
  },
  {
    id: 3,
    name: "Curtis",
    card: null,
    room: 10101,
  },
];

function getUsers() {
  return users;
}

function getUserByID(id) {
  return users.find((user) => user.id === Number(id));
}

function addUser(name, card, room) {
  //Generate ids until a unique id is found
  let id = Math.floor(Math.random() * 90000) + 10000;
  while (getUserByID(id) !== undefined) {
    id = Math.floor(Math.random() * 90000) + 10000;
  }
  const user = {
    id: Number(id),
    name: name,
    card: card,
    room: room,
  };
  users.push(user);
  return user;
}

function updateUser(id, name, card, room) {
  let user = getUserByID(id);
  if (user) {
    user.name = name;
    user.card = card;
    user.room = room;
  }
  return user;
}

function deleteUser(id) {
  if (getUserByID(id) == undefined) {
    //User with given ID Does Not Exist
    return false;
  }

  const index = users.findIndex((user) => user.id === Number(id));
  users.splice(index, 1);
  return true;
}

export { getUsers, getUserByID, addUser, updateUser, deleteUser };
