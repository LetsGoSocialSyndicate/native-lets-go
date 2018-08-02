/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
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

const styles = {
  eventStatusImageStyle: {
    marginLeft: 20,
    height: 40,
    width: 40
  }
}

export { renderJoinRequestButtonOrIcon }
