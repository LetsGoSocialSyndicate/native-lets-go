/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-else-return */
 import moment from 'moment'
 import React from 'react'
 import { Image } from 'react-native'
 import { ImageButton } from '../common'

 const requestToJoinButton = require('../../assets/buttons/request_to_join.png')
 const requestSent = require('../../assets/oneActivity/sent.png')
 const requestAccepted = require('../../assets/oneActivity/accepted.png')
 const requestDeclined = require('../../assets/oneActivity/declined.png')

//  const renderJoinRequestButtonOrIcon = (activity, user, onPressRequestToJoin) => {
//   if (activity.join_requested_by === user.id) {
//     if (activity.join_request_rejected_by) {
//       return <Image style={styles.eventStatusImageStyle} source={requestDeclined} />
//     }
//     const source = activity.join_request_accepted_by
//       ? requestAccepted : requestSent
//     return <Image style={styles.eventStatusImageStyle} source={source} />
//   }
//   return (
//     <ImageButton
//       buttonSource={requestToJoinButton}
//       handleOnPress={onPressRequestToJoin}
//     />
//   )
// }
const renderStatusIcons = (activity, user) => {
 if (activity.join_requested_by === user.id) {
   if (activity.join_request_rejected_by) {
     return <Image style={styles.eventStatusImageStyle} source={requestDeclined} />
   }
   const source = activity.join_request_accepted_by
     ? requestAccepted : requestSent
   return <Image style={styles.eventStatusImageStyle} source={source} />
 } else {
   return null
 }
}

const renderJoinRequest = (activity, onPressRequestToJoin) => {
  if (activity.join_requested_by === null) {
    return (
      <ImageButton
        buttonSource={requestToJoinButton}
        handleOnPress={onPressRequestToJoin}
      />
    )
  } else {
    return null
  }
}

const getDaysDiff = dateTime => {
  return moment(dateTime).startOf('day').diff(moment().startOf('day'), 'days')
}

const formatRelativeEventDateTime = dateTime => {
  const dateTimeMoment = moment(dateTime)
  const daysDiff = getDaysDiff(dateTime)
  if (daysDiff === 0) {
    return dateTimeMoment.format('[Today at] hh:mma')
  } else if (daysDiff === 1) {
    return dateTimeMoment.format('[Tomorrow at] hh:mma')
  } else {
    return dateTimeMoment.format('[on] MMM DD [at] hh:mma')
  }
}

const formatEventDateTime = (dateTime, prefix) => {
  const actualPrefix = prefix ? `${prefix} ` : ''
  return moment(dateTime).format(`[${actualPrefix}on] MMM DD [at] hh:mma`)
}

const formatCoarseEventDate = (dateTime) => {
  return moment(dateTime).format('MMMM YYYY')
}

const styles = {
  eventStatusImageStyle: {
    marginLeft: 20,
    height: 40,
    width: 40
  }
}

export {
  // renderJoinRequestButtonOrIcon,
  renderStatusIcons,
  renderJoinRequest,
  formatCoarseEventDate,
  formatEventDateTime,
  formatRelativeEventDateTime
}
