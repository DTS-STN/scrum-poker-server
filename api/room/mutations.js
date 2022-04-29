import {
  addRoom,
  updateRoom,
  deleteRoom,
  addUserToRoom,
  getRoomByID,
} from '../../datasets/rooms.js'
import { pubsub } from '../graphql/pubsub.js'

export default {
  addRoom: async (_, { userid, cards }) => {
    const room = addRoom(userid, cards)
    if (room) {
      return {
        success: true,
        message: 'Room added',
        id: room.id,
      }
    } else {
      return { success: false, message: 'Failed to add room' }
    }
  },
  updateRoom: async (_, { id, users, isShown, timer, cards }) => {
    console.log('update room', id, users, isShown, timer, cards)
    try {
      if (updateRoom(id, users, isShown, timer, cards)) {
        const room = getRoomByID(id)
        pubsub.publish('ROOM_UPDATED', {
          roomUpdated: room,
        })
        return { success: true, message: 'Room updated' }
      } else {
        return { success: false, message: 'Failed to update room' }
      }
    } catch (error) {
      return { success: false, message: 'Failed to update room' }
    }
  },
  deleteRoom: async (_, { id }) => {
    if (deleteRoom(id)) {
      return { success: true, message: 'Room deleted' }
    } else {
      return { success: false, message: 'Failed to delete room' }
    }
  },
  addUserToRoom: async (_, { roomid, userid }) => {
    if (addUserToRoom(roomid, userid)) {
      const room = getRoomByID(roomid)
      pubsub.publish('ROOM_UPDATED', {
        roomUpdated: room,
      })
      return { success: true, message: 'User added' }
    } else {
      return { success: false, message: 'Failed to add user' }
    }
  },
}
