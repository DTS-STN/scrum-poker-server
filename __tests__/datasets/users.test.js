import {
  getUsers,
  getUserByID,
  addUser,
  updateUser,
  deleteUser,
} from '../../datasets/users'
import { setupFull, setupRoom, teardownFull } from '../helpers/datasets'

describe('Test getUsers functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully get users', () => {
    teardownFull()

    let [user, room, message] = setupFull()

    addUser('newUser1', 12, room.id, '#1209A7')
    addUser('newUser2', 13, room.id, '#FFFFFF')
    addUser('newUser3', 14, room.id, '#111111')
    const expected = [
      {
        id: user.id,
        name: user.name,
        card: user.card,
        room: user.room,
        color: user.color,
      },
      {
        id: expect.any(Number),
        name: 'newUser1',
        card: 12,
        room: room.id,
        color: '#1209A7',
      },
      {
        id: expect.any(Number),
        name: 'newUser2',
        card: 13,
        room: room.id,
        color: '#FFFFFF',
      },
      {
        id: expect.any(Number),
        name: 'newUser3',
        card: 14,
        room: room.id,
        color: '#111111',
      },
    ]

    expect(getUsers()).toEqual(expected)
  })
})

describe('Test getUserByID functionality', () => {
  test('Test to get a user based off of their ID', () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: expect.any(Number),
      name: 'testUserName',
    }

    expect(getUserByID(user.id)).toEqual(expected)
  })
})

describe('Test addUser functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('addUser', () => {
    let [user, room] = setupRoom()

    const expected = {
      id: expect.any(Number),
      name: 'newUser1',
      card: 12,
      room: room.id,
      color: '#1209A7',
    }

    let newUser = addUser(expected.name, expected.card, room.id, expected.color)
    expect(getUserByID(newUser.id)).toEqual(expected)
  })

  test('addUser with only name and card parameters', () => {
    let [user, room] = setupRoom()

    const expected = {
      id: expect.any(Number),
      name: 'newUser1',
      card: 12,
    }

    let newUser = addUser(expected.name, expected.card)
    expect(getUserByID(newUser.id)).toEqual(expected)
  })
})

describe('Test updateUser functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully update the user', () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: expect.any(Number),
      name: 'newUser1',
      card: 12,
      room: room.id,
      //color: '#1209A7',
    }

    expect(getUserByID(user.id)).toEqual(user)
    user = updateUser(user.id, expected.name, expected.card, expected.room)
    expect(getUserByID(user.id)).toEqual(expected)
  })
})

describe('Test deleteUser functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully delete user', () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: expect.any(Number),
      name: user.name,
      card: user.card,
      room: user.room,
      color: user.color,
    }

    expect(getUserByID(user.id)).toEqual(expected)
    deleteUser(user.id)
    expect(getUserByID(user.id)).not.toEqual(expected)
  })

  test('Fail to delete user', () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: expect.any(Number),
      name: user.name,
      card: user.card,
      room: user.room,
      color: user.color,
    }

    let newUser = Math.floor(Math.random() * 90000) + 10000

    while (user.id === newUser) {
      newUser = id = Math.floor(Math.random() * 90000) + 10000
    }

    expect(getUserByID(user.id)).toEqual(expected)
    let result = deleteUser(newUser)
    expect(result).toEqual(false)
  })
})
