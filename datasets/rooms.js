let rooms = [
  {
    id: "85723",
    host: 1,
    users: [1, 2],
    cards: [1, 2, 3, 5, 8, 13, 20, 1000],
    isShown: true,
    timer: {
      timestamp: null,
      duration: null,
    },
  },
  {
    id: "10101",
    host: 3,
    users: [3],
    cards: [1, 2, 3, 5, 8, 13, 20, 1000],
    isShown: false,
    timer: {
      timestamp: null,
      duration: null,
    },
  },
];

function getRooms() {
  return rooms;
}

function getRoomByID(id) {
  return rooms.find((room) => room.id === id.toUpperCase());
}

function addRoom(userid, cards) {
  //Generate ids until a unique id is found
  let id = Math.random().toString(36).slice(-5);
  while (getRoomByID(id) !== undefined) {
    id = Math.random().toString(36).slice(-5);
  }
  const room = {
    id: id.toUpperCase(),
    host: Number(userid),
    users: [Number(userid)],
    isShown: false,
    cards: cards,
    timer: {
      timeStamp: null,
      duration: null,
    },
  };
  rooms.push(room);
  return room;
}

function updateRoom(id, users, isShown, timer, cards) {
  let room = getRoomByID(id);
  if (room) {
    room.users = users.map((i) => Number(i));
    room.cards = cards.map((i) => Number(i));
    room.isShown = isShown;
    room.timer = timer;
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
    return false;
  }

  const index = rooms.findIndex((room) => room.id === id.toUpperCase());
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
