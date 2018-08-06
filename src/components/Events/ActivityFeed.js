/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
/* eslint-disable camelcase */
import moment from 'moment'
import { Text } from 'native-base'
import React, { Component } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { addChatMessage } from '../../actions/actionChat'
import { handleRequest } from '../../actions/actionRequest'
import { formatRelativeEventDateTime, renderStatusIcons, renderJoinRequest } from '../common/ActivityUtils'
import { CONTENT_WIDTH } from '../common/Constants'
import { getActivityImage, getUserpicSource } from '../common/ImageUtils'
import LoadingButton from '../common/LoadingButton'
import { getNickname } from '../common/UserUtils.js'
import { sendJoinRequest } from '../Messages/ChatUtils'

class ActivityFeed extends Component {
  onPressRequestToJoin = () => {
    // Navigate to myActivities only after handleRequest is complete.
    this.props.handleRequest(this.props.activity.event_id, this.props.auth.token)
      .then(() => Actions.myActivities({ origin: 'ActivityFeed' }))
    sendJoinRequest(this.props.activity, this.props.user, this.props.chat.socket)
  }
  onProfilePicturePress = () => {
    // console.log('this.props.activity', this.props.activity)
    Actions.profile({
      origin: 'ActivityFeed',
      otherUserInfo: this.props.activity,
      forOtherUser: true
    })
  }
  onActivityPicturePress = () => {
    Actions.viewActivity({
      origin: 'ActivityFeed',
      activity: this.props.activity
    })
  }
  getAvatar = () => {
    return this.props.user.images && this.props.user.images.length > 0
      ? this.props.user.images[0].image_url
      : ''
  }

  render() {
    // console.log('ActivityFeed.render', this.props)
    const {
      event_start_time,
      user_image_url,
      birthday,
      event_location,
      event_title,
      event_category
    } = this.props.activity
    const eventDateTime = formatRelativeEventDateTime(event_start_time)
    const age = moment.duration(moment().diff(birthday)).years()
    const eventImage = getActivityImage(event_category)
    const nickname = getNickname(this.props.activity)

    return (
      <View style={styles.containerStyle}>
        <View style={styles.organizerSectionStyle}>
          <LoadingButton
            imageStyle={styles.profileImageStyle}
            onPress={this.onProfilePicturePress}
            source={getUserpicSource(user_image_url)}
          />
          <View style={styles.eventInfoStyle}>
            <Text style={styles.textHeaderStyle}>{nickname}, {age}</Text>
            <Text style={styles.textStyle}>{eventDateTime}</Text>
            <Text style={styles.textStyle}>{event_location}</Text>
          </View>
        </View>

        <Text style={styles.eventTitleStyle}>{event_title}</Text>

        <View style={styles.eventSectionStyle}>
          <TouchableOpacity onPress={this.onActivityPicturePress}>
            <Image style={styles.eventImageStyle} source={eventImage} />
          </TouchableOpacity>

          <View style={styles.statusIconContainerStyle}>
            {renderStatusIcons(this.props.activity, this.props.user)}
          </View>
        </View>
        {renderJoinRequest(this.props.activity, this.onPressRequestToJoin)}
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    width: CONTENT_WIDTH,
    backgroundColor: 'transparent',
  },
  organizerSectionStyle: {
    flexDirection: 'row'
  },
  profileImageStyle: {
    marginTop: 10,
    marginLeft: 10,
    height: 70,
    borderRadius: 35,
    width: 70,
    borderColor: 'white',
    borderWidth: 4
  },
  eventInfoStyle: {
    marginTop: 20,
    marginLeft: 10,
    flexDirection: 'column'
  },
  textHeaderStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 14,
    fontWeight: 'bold'
  },
  textStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 12,
  },
  eventTitleStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: 'center',
  },
  eventSectionStyle: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  eventImageStyle: {
    marginTop: 10,
    marginLeft: 10,
    height: 100,
    borderRadius: 50,
    width: 100,
    borderColor: 'white',
    borderWidth: 4,
  },
  statusIconContainerStyle: {
    marginTop: 30,
    marginRight: 30,
    marginLeft: 40,
    width: 60
  },
}

const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.user.user, chat: state.chat }
}

const dispatchToProps = (dispatch) => bindActionCreators({
  handleRequest,
  addChatMessageAction: addChatMessage
}, dispatch)

export default connect(mapStateToProps, dispatchToProps)(ActivityFeed)
