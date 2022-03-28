let rooms = [
  {
    id: "85723",
    host: 1,
    users: [1, 2],
    isShown: true,
  },
  {
    id: "10101",
    host: 3,
    users: [3],
    isShown: false,
  },
];

function getRooms() {
  return rooms;
}

function getRoomByID(id) {
  return rooms.find((room) => room.id === id);
}

function addRoom(userid) {
  //Generate ids until a unique id is found
  let id = Math.random().toString(36).slice(-5);
  while (getRoomByID(id) !== undefined) {
    id = Math.random().toString(36).slice(-5);
  }
  const room = {
    id: id,
    host: Number(userid),
    users: [Number(userid)],
    isShown: false,
  };
  rooms.push(room);
  return room;
}

function updateRoom(id, users, isShown) {
  let room = getRoomByID(id);
  if (room) {
    room.users = users.map((i) => Number(i));
    room.isShown = isShown;
    return true;
  }
  return false;
}

function addUserToRoom(roomid, userid) {
  let room = getRoomByID(roomid);
  if (room) {
    room.users.push(userid);
    return true;
  }
  return false;
}

function deleteRoom(id) {
  if (getRoomByID(id) == undefined) {
    //Author with given ID Does Not Exist
    return false;
  }

  const index = rooms.findIndex((room) => room.id === id);
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
