let messages = [
  {
    id: '41490779',
    userId: 'U1490849',
    name: 'Alexa',
    content: 'Hey siri play Luis Miguel el concierto',
    edited: false,
    roomId: 'R1490849',
  },
  {
    id: '41490849',
    userId: 'U1490847',
    name: 'Siri',
    content: 'Playing Luis Miguel el concierto from spotify',
    edited: false,
    roomId: 'R1490849',
  },
]

function getMessages() {
  return messages
}

function getRoomMessages(roomId) {
  return messages.filter((message) => message.roomId === roomId)
}

function getMessageByID(id) {
  return messages.find((message) => message.id == id)
}

//Adds a message
function addMessage(roomId, name, content) {
  let id =
    new Date().getUTCMilliseconds() + Math.random().toString(10).slice(-5)

  const message = {
    id: id,
    name: name,
    content: content,
    edited: false,
    roomId: roomId,
  }

  messages.push(message)
  return message
}

// Edit a message
function updateMessage(roomId, id, content) {
  let message = getMessageByID(id)
  if (message && message.roomId === roomId) {
    message.content = content
    message.edited = true
    return true
  }
  return false
}

// Delete a message
function deleteMessage(roomId, id) {
  if (getMessageByID(id) === undefined) {
    //User with given ID Does Not Exist
    return false
  }

  const index = messages.findIndex(
    (message) => message.id === id && message.roomId === roomId
  )
  messages.splice(index, 1)
  return true
}

export {
  messages,
  getMessages,
  getRoomMessages,
  getMessageByID,
  addMessage,
  updateMessage,
  deleteMessage,
}
