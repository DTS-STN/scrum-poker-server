/* istanbul ignore file */
import { addRoom, getRooms, deleteRoom } from '../../datasets/rooms'
import {
  addMessage,
  deleteMessage,
  getMessageByID,
  getMessages,
} from '../../datasets/messages'
import { addUser, getUsers, deleteUser } from '../../datasets/users'

function setupRoom(inputUser, inputRoom) {
  let user = inputUser
    ? addUser(
        inputUser.name || 'testUserName',
        typeof inputUser.card !== undefined ? inputUser.card : undefined,
        inputUser.room ? inputUser.room : undefined,
        inputUser.color ? inputUser.color : undefined
      )
    : addUser('testUserName')

  let room = inputRoom
    ? addRoom(user.id, inputRoom.cards || 1)
    : addRoom(user.id, 1)

  return [user, room]
}

function setupFull(inputUser, inputRoom, inputMessage) {
  let user = inputUser
    ? addUser(
        inputUser.name || 'testUserName',
        inputUser.card ? inputUser.card : undefined,
        inputUser.room ? inputUser.room : undefined,
        inputUser.color ? inputUser.color : undefined
      )
    : addUser('testUserName')

  let room = inputRoom
    ? addRoom(user.id, inputRoom.cards || 1)
    : addRoom(user.id, 1)

  let message = inputMessage
    ? addMessage(
        room.id,
        inputMessage.name || 'testMessageName',
        inputMessage.content || 'testMessageContent'
      )
    : addMessage(room.id, 'testMessageName', 'testMessageContent')

  return [user, room, message]
}

function teardownMessages() {
  let messages = getMessages()
  if (messages.length > 0) {
    messages.forEach((message) => {
      deleteMessage(message.roomId, message.id)
    })
    return true
  }
  return false
}

function teardownRooms() {
  let rooms = getRooms()
  if (rooms.length > 0) {
    rooms.forEach((room) => {
      deleteRoom(room.id)
    })
    return true
  }
  return false
}

function teardownUsers() {
  let users = getUsers()
  if (users.length > 0) {
    users.forEach((user) => {
      deleteUser(user.id)
    })
    return true
  }
  return false
}

function teardownFull() {
  if (teardownMessages() && teardownRooms() && teardownUsers()) {
    return true
  }
  return false
}

export { setupRoom, setupFull, teardownFull }
