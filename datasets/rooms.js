let rooms = [
    {
      id: "85723",
      name: "Tommy's room"
    },
    {
      id: "10101",
      name: "Ben's room"
    },
  ];
  
  function getRooms() {
    return rooms;
  }
  
  function getRoomByID(id) {
    return rooms.find((room) => room.id == id);
  }
  
  function addRoom(name) {
    
    //Generate ids until a unique id is found
    let id = Math.random().toString(36).slice(-5)
    while (getRoomByID(id) != undefined) {
      id = Math.random().toString(36).slice(-5)
    }
    console.log(id)
    const room = {
      id: id,
      name: name,
    };
    rooms.push(room);
    return room;
  }
  
  function updateRoom(id, name) {
    let room = getRoomByID(id);
    if (room == undefined) {
      return false;
    }
    room.name = name;
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
  };
  