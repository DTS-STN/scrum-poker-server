//
import { messages, getRoomMessages } from '../../datasets/messages.js'

export default {
  messages: {
    subscribe: (parent, args, { pubsub }) => {
      setTimeout(() => pubsub.publish(['MESSAGES'], { messages }), 0)
      return pubsub.asyncIterator(['MESSAGES'])
    },
  },
  roomMessages: {
    subscribe: (parent, args, { pubsub }) => {
      const roomMessages = getRoomMessages(args.roomId)
      setTimeout(() => pubsub.publish(['MESSAGES'], { roomMessages }), 0)
      return pubsub.asyncIterator(['MESSAGES'])
    },
  },
}
