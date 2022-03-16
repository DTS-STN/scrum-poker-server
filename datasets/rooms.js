let rooms = [
  {
    id: "85723",
    host: 1,
    users: [1, 2],
    isShown: true,
  },
  {
    id: "10101",
    host: 2,
    users: [2],
    isShown: false,
  },
];

function getRooms() {
  return rooms;
}

function getRoomByID(id) {
  return rooms.find((room) => room.id == id);
}

function addRoom(host) {
  //Generate ids until a unique id is found
  let id = Math.random().toString(36).slice(-5);
  while (getRoomByID(id) != undefined) {
    id = Math.random().toString(36).slice(-5);
  }
  console.log(id);
  const room = {
    id: id,
    host: host,
    users: [host],
    isShown: false,
  };
  rooms.push(room);
  return room;
}

function updateRoom(id, users) {
  let room = getRoomByID(id);
  if (room == undefined) {
    return false;
  }
  room.users = users;
  return true;
}

function addUserToRoom(roomID, userID) {
  let room = getRoomByID(roomID);
  if (room == undefined) {
    return false;
  }
  room.users.push(userID);
  return true;
}

function deleteRoom(id) {
  if (getRoomByID(id) == undefined) {
    //Author with given ID Does Not Exist
    return false;
  }

  const index = rooms.findIndex((room) => room.id == id);
  rooms.splice(index, 1);
  return true;
}

export {
  getRooms,
  getRoomByID,
  addRoom,
  updateRoom,
  deleteRoom,
  addUserToRoom,
};
