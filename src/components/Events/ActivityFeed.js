/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Image, View, TouchableOpacity } from 'react-native'
import { Text, Card, CardItem, Item, Body, Container } from 'native-base'
import moment from 'moment'
import uuid from 'uuid'
import { ImageButton } from '../common'
import { SEND_JOIN_REQUEST } from '../Messages/ChatProtocol'
import { getActivityImage } from '../common/imageUtils'

import { handleRequest } from '../../actions/actionRequest'
import { addChatMessage } from '../../actions/actionChat'
const requestToJoinButton = require('../../assets/buttons/request_to_join.png')
const backgroundImage = require('../../assets/assets_5.28-06.png')
import { CONTENT_WIDTH, DATETIME_FORMAT } from '../common/Constants'

class ActivityFeed extends Component {
  onPressRequestToJoin = () => {
    const { user_id, event_id } = this.props.activity
    this.props.handleRequest(event_id, user_id, this.props.auth.token)
    const chatmateId = this.props.activity.event_posted_by
    const message = {
      user: {
        avatar: this.props.user.images[0].image_url,
        name: `${this.props.user.first_name} ${this.props.user.last_name}`,
        _id: this.props.user.id
      },
      createdAt: moment().format(DATETIME_FORMAT),
      text: `Request to join '${this.props.activity.event_title}'`,
      _id: uuid()
    }
    const typedMessage = { ...message, type: 'joinRequest'}
    this.props.addChatMessageAction(
      chatmateId,
      false,  // isIncoming
      false,  // markAsUnread
      typedMessage
    )
    this.props.chat.socket.emit(
      SEND_JOIN_REQUEST,
      chatmateId,
      typedMessage
    )
  }
  onProfilePicturePress = () => {
    console.log('this.props.activity', this.props.activity)
    Actions.profile({ origin: 'ActivityFeed', otherUserInfo: this.props.activity, forOtherUser: true })
  }
  onActivityPicturePress = () => {
    Actions.viewActivity({ origin: 'ActivityFeed', activity: this.props.activity })
  }
  render() {
    const {
      event_start_time,
      user_image_url, first_name, last_name, birthday,
      event_location, event_title, event_category
    } = this.props.activity
    const eventDate = {
      date: new Date(event_start_time).toDateString().substr(4,7),
      time: (event_start_time).substr(11,5)
    }
    const {
      containerStyle, textStyle, textHeaderStyle,
      eventInfoStyle, eventSectionStyle,
      profileImageStyle, organizerSectionStyle,
      eventTitleStyle, eventImageStyle
    } = styles
    const age = moment.duration(moment().diff(birthday)).years()
    const eventImage = getActivityImage(event_category)
    return (
      <View style={ containerStyle }>
        <View style={ organizerSectionStyle }>
          <TouchableOpacity onPress={ this.onProfilePicturePress }>
            <Image style={ profileImageStyle } source={{ uri: user_image_url }} />
          </TouchableOpacity>
          <View style={ eventInfoStyle }>
            <Text style={ textHeaderStyle }>{ first_name } { last_name }, {age}</Text>
            <Text style={ textStyle }>{ `on ${eventDate.date} at ${eventDate.time}` }</Text>
            <Text style={ textStyle }>{ event_location }</Text>
          </View>
        </View>
        <View style={ eventSectionStyle }>
          <Text style={ eventTitleStyle }>{ event_title }</Text>
          <TouchableOpacity onPress={ this.onActivityPicturePress }>
            <Image style={ eventImageStyle } source={ eventImage } />
          </TouchableOpacity>
          <ImageButton buttonSource={ requestToJoinButton }
            handleOnPress={ this.onPressRequestToJoin }/>
        </View>
        <Item bordered>
          <Text></Text>
        </Item>
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
  eventSectionStyle: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventInfoStyle: {
    marginTop: 20,
    marginLeft: 10,
    flexDirection: 'column'
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
  eventImageStyle: {
    marginTop: 10,
    marginLeft: 10,
    height: 100,
    borderRadius: 50,
    width: 100,
    borderColor: 'white',
    borderWidth: 4
  },
  textHeaderStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 14,
    fontWeight: 'bold'
  },
  eventTitleStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 18,
  },
  textStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 12,
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.user.user, chat: state.chat }
}

const dispatchToProps = (dispatch) => bindActionCreators({
  handleRequest,
  addChatMessageAction: addChatMessage
}, dispatch)

export default connect(mapStateToProps, dispatchToProps)(ActivityFeed)
