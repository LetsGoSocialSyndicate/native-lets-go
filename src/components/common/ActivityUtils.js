/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-else-return */
 import moment from 'moment'
 import React from 'react'
 import { Image } from 'react-native'
 import { Text } from 'native-base'
 import { ImageButton } from '../common'

 const requestToJoinButton = require('../../assets/buttons/request_to_join.png')
 const requestSent = require('../../assets/request-sent.png')
 const requestAccepted = require('../../assets/request-accepted.png')

 const renderJoinRequestButtonOrIcon = (activity, user, onPressRequestToJoin) => {
  if (activity.join_requested_by === user.id) {
    if (activity.join_request_rejected_by) {
      // TODO: Rejected Icon
      return <Text>Rejected</Text>
    }
    const source = activity.join_request_accepted_by
      ? requestAccepted : requestSent
    return <Image style={styles.eventStatusImageStyle} source={source} />
  }
  return (
    <ImageButton
      buttonSource={requestToJoinButton}
      handleOnPress={onPressRequestToJoin}
    />
  )
}

const formatRelativeEventDateTime = dateTime => {
  const dateTimeMoment = moment(dateTime)
  const daysDiff = dateTimeMoment.diff(moment(), 'days')
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

const styles = {
  eventStatusImageStyle: {
    marginLeft: 20,
    height: 40,
    width: 40
  }
}

export {
  renderJoinRequestButtonOrIcon,
  formatEventDateTime,
  formatRelativeEventDateTime
}
