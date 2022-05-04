import {
  getRooms,
  getRoomByID,
  addRoom,
  updateRoom,
  deleteRoom,
  addUserToRoom,
} from '../../datasets/rooms'
import { addUser } from '../../datasets/users'
import { setupFull, setupRoom, teardownFull } from '../helpers/datasets'

describe('Test getRooms functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully getRooms', () => {
    teardownFull()

    let [user, room, message] = setupFull()

    const expected = {
      id: room.id,
      host: expect.any(Number),
      users: [expect.any(Number)],
      isShown: false,
      cards: expect.anything(),
      timer: {
        timeStamp: null,
        duration: null,
      },
    }

    expect(getRooms()).toMatchObject([expected])
  })
})

describe('Test getRoomByID functionality', () => {
  test("Test to get a room based off of it's ID", () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: room.id,
      host: expect.any(Number),
      users: [expect.any(Number)],
      isShown: false,
      cards: expect.anything(),
      timer: {
        timeStamp: null,
        duration: null,
      },
    }

    expect(getRoomByID(room.id)).toEqual(expected)
  })
})

describe('Test addRoom functionality', () => {
  test('addRoom', () => {
    let [user, room] = setupRoom()

    const expected = {
      id: expect.any(String),
      host: user.id,
      users: [user.id],
      isShown: false,
      cards: [12],
      timer: {
        timeStamp: null,
        duration: null,
      },
    }

    let newRoom = addRoom(user.id, [12])
    expect(getRoomByID(newRoom.id)).toEqual(expected)
  })
})

describe('Test updateRoom functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully update the Room', () => {
    let [user, room, message] = setupFull()

    const expected = [
      {
        id: room.id,
        host: expect.any(Number),
        users: [expect.any(Number)],
        isShown: false,
        cards: expect.anything(),
        timer: {
          timeStamp: null,
          duration: null,
        },
      },
      {
        id: room.id,
        host: expect.any(Number),
        users: [1, 3, 4],
        isShown: false,
        cards: [1, 3, 4],
        timer: {
          timeStamp: null,
          duration: null,
        },
      },
    ]

    expect(getRoomByID(room.id)).toEqual(expected[0])
    updateRoom(
      room.id,
      expected[1].users,
      expected[1].isShown,
      expected[1].timer,
      expected[1].cards
    )
    expect(getRoomByID(room.id)).toEqual(expected[1])
  })

  test('Fail to update the Room', () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: room.id,
      host: expect.any(Number),
      users: [expect.any(Number)],
      isShown: false,
      cards: 12,
      timer: {
        timeStamp: null,
        duration: null,
      },
    }
    let newRoom = Math.random().toString(36).slice(-5)

    while (room.id === newRoom) {
      newRoom = Math.random().toString(36).slice(-5)
    }

    let result = updateRoom(newRoom)
    expect(result).toEqual(false)
  })
})

describe('Test deleteRoom functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully delete Room', () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: room.id,
      host: expect.any(Number),
      users: [expect.any(Number)],
      isShown: false,
      cards: 1,
      timer: {
        timeStamp: null,
        duration: null,
      },
    }

    expect(getRoomByID(room.id)).toEqual(expected)
    deleteRoom(room.id)
    expect(getRoomByID(room.id)).not.toEqual(expected)
  })

  test('Fail to delete Room', () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: room.id,
      host: expect.any(Number),
      users: [expect.any(Number)],
      isShown: false,
      cards: 1,
      timer: {
        timeStamp: null,
        duration: null,
      },
    }
    let newRoom = Math.random().toString(36).slice(-5)

    while (room.id === newRoom) {
      newRoom = Math.random().toString(36).slice(-5)
    }

    expect(getRoomByID(room.id)).toEqual(expected)
    deleteRoom(newRoom)
    expect(getRoomByID(room.id)).toEqual(expected)
  })
})

describe('Test addUserToRoom functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully add user to the room', () => {
    let [user, room, message] = setupFull()

    let newUser = addUser('newUser')

    expect(getRoomByID(room.id).users).not.toEqual(
      expect.arrayContaining([newUser.id])
    )
    addUserToRoom(room.id, newUser.id)
    expect(getRoomByID(room.id).users).toEqual(
      expect.arrayContaining([newUser.id])
    )
  })

  test('Fail to add user to the room', () => {
    let [user, room, message] = setupFull()

    let newUser = addUser('newUser')

    let newRoom = Math.random().toString(36).slice(-5)

    while (room.id === newRoom) {
      newRoom = Math.random().toString(36).slice(-5)
    }

    expect(getRoomByID(room.id).users).not.toEqual(
      expect.arrayContaining([newUser.id])
    )
    let result = addUserToRoom(newRoom, newUser.id)
    expect(result).toEqual(false)
  })
})
