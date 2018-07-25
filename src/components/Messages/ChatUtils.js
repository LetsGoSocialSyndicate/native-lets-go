/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
 import moment from 'moment'
 import uuid from 'uuid'
 import { DATETIME_FORMAT } from '../common/Constants'

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
