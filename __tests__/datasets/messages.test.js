//import { TestWatcher } from 'jest'
//import '../../datasets/messages'
import {
  getMessages,
  getRoomMessages,
  getMessageByID,
  addMessage,
  updateMessage,
  deleteMessage,
} from '../../datasets/messages'
import { setupFull, setupRoom, teardownFull } from '../helpers/datasets'

describe('Test getMesssages functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully getMessages', () => {
    let [user, room, message] = setupFull()

    const expected = [
      {
        id: message.id,
        //userId: user['id'],
        name: 'testMessageName',
        content: 'testMessageContent',
        edited: false,
        roomId: room.id,
      },
    ]

    expect(getMessages()).toEqual(expect.arrayContaining(expected))
  })
})

describe('Test getRoomMessages functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully getRoomMessages', () => {
    let [user, room, message] = setupFull()

    const expected = [
      {
        id: message.id,
        //userId: user['id'],
        name: 'testMessageName',
        content: 'testMessageContent',
        edited: false,
        roomId: room.id,
      },
    ]

    expect(getRoomMessages(room.id)).toEqual(expect.arrayContaining(expected))
  })
})

describe('Test getMesssageByID functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test("Test to get a message based off of it's ID", () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: message.id,
      //userId: user['id'],
      name: 'testMessageName',
      content: 'testMessageContent',
      edited: false,
      roomId: room.id,
    }

    expect(getMessageByID(message.id)).toEqual(expected)
  })
})

describe('Test addMesssage functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('addMessage', () => {
    teardownFull()

    let [user, room] = setupRoom()

    const expected = {
      id: expect.any(String),
      name: 'testMessageName',
      content: 'testMessageContent',
      edited: false,
      roomId: room.id,
    }

    addMessage(room.id, 'testMessageName', 'testMessageContent')
    //expect(getMessages()).toMatch(expect.arrayContaining([expect.objectContaining(expected)]))
    expect(getMessages()).toMatchObject([expected])
  })
})

describe('Test updateMesssage functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully update the Message', () => {
    let [user, room, message] = setupFull()

    const expected = [
      {
        id: message.id,
        //userId: user['id'],
        name: 'testMessageName',
        content: 'testMessageContent',
        edited: false,
        roomId: room.id,
      },
      {
        id: message.id,
        //userId: user['id'],
        name: 'testMessageName',
        content: 'testMessageContent2',
        edited: true,
        roomId: room.id,
      },
    ]

    expect(getMessageByID(message.id)).toEqual(expected[0])
    updateMessage(room.id, message.id, expected[1]['content'])
    expect(getMessageByID(message.id)).toEqual(expected[1])
  })

  test('Fail to update the Message', () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: message.id,
      //userId: user['id'],
      name: 'testMessageName',
      content: 'testMessageContent',
      edited: false,
      roomId: room.id,
    }

    expect(getMessageByID(message.id)).toEqual(expected)
    updateMessage()
    expect(getMessageByID(message.id)).toEqual(expected)
  })
})

describe('Test deleteMesssage functionality', () => {
  beforeEach(() => {
    teardownFull()
  })

  test('Successfully delete Message', () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: message.id,
      //userId: user['id'],
      name: 'testMessageName',
      content: 'testMessageContent',
      edited: false,
      roomId: room.id,
    }

    expect(getMessageByID(message.id)).toEqual(expected)
    deleteMessage(room.id, message.id)
    expect(getMessageByID(message.id)).not.toEqual(expected)
  })

  test('Fail to delete Message', () => {
    let [user, room, message] = setupFull()

    const expected = {
      id: message.id,
      //userId: user['id'],
      name: 'testMessageName',
      content: 'testMessageContent',
      edited: false,
      roomId: room.id,
    }

    expect(getMessageByID(message.id)).toEqual(expected)
    deleteMessage()
    expect(getMessageByID(message.id)).toEqual(expected)
  })
})
