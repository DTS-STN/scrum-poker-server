import {
  getMessages,
  getRoomMessages,
  getMessageByID,
} from '../../datasets/messages.js'

export default {
  messages: (_, { id }) => {
    return id ? [getMessageByID(id)] : getMessages()
  },
  roomMessages: (_, { roomId }) => {
    return roomId ? [getRoomMessages(roomId)] : getMessages()
  },
}
