/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
 import moment from 'moment'
 import uuid from 'uuid'

 import { DATETIME_FORMAT } from '../common/Constants'
 import { MESSAGE_TYPE_JOIN_REQUEST, SEND_JOIN_REQUEST } from './ChatProtocol'

export const getChatUser = user => {
   const chatUser = {
     _id: user.id,
     name: `${user.first_name} ${user.last_name.charAt(0)}`
   }
   if (user.images.length > 0) {
     chatUser.avatar = user.images[0].image_url
   }
   return chatUser
 }

 export const createChatMessage = (user, text) => {
   return {
    user: getChatUser(user),
    createdAt: moment().format(DATETIME_FORMAT),
    text,
    _id: uuid()
  }
}

export const sendJoinRequest = (activity, user, socket) => {
  const chatmateId = activity.event_posted_by
  const message = createChatMessage(
    user,
    `Request to join '${activity.event_title}'`
  )
  const typedMessage = {
    ...message,
    eventId: activity.event_id,
    type: MESSAGE_TYPE_JOIN_REQUEST
  }
  console.log('onPressRequestToJoin', chatmateId, typedMessage)
  // Not needed since we do not show outgoing requests for now.
  // this.props.addChatMessageAction(
  //   chatmateId,
  //   false,  // isIncoming
  //   false,  // markAsUnread
  //   typedMessage
  // )
  return socket.emit(SEND_JOIN_REQUEST, chatmateId, typedMessage)
}
