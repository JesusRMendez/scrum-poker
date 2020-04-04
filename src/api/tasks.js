import { db } from './index'

const roomsRef = db.collection('rooms')

export default {
  setVote (roomId, taskId, voteData) {
    console.log(arguments)
    return roomsRef.doc(roomId).collection('tasks').doc(taskId).set(voteData, { merge: true })
  }
}
