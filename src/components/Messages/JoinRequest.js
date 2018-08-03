/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
import React, { Component } from 'react'
import { Item, Text } from 'native-base'
import { Image, TouchableOpacity, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { removeChatMessage } from '../../actions/actionChat'
import { acceptRequest, rejectRequest } from '../../actions/actionRequest'
import { ImageButton } from '../common'
import { CONTENT_WIDTH } from '../common/Constants'
import { getUserpicSource } from '../common/imageUtils'
import { DELETE_MESSAGE, MESSAGE_TYPE_JOIN_REJECT, SEND_MESSAGE } from './ChatProtocol'
import { createChatMessage } from '../Messages/ChatUtils'

const acceptButton = require('../../assets/buttons/accept.png')
const viewRequestButton = require('../../assets/buttons/view_request.png')
// TODO: replace with real reject button
const rejectButton = require('../../assets/Decline3.png')

const overlayButtonWidth = CONTENT_WIDTH - 50

class JoinRequest extends Component {
  state = {
    timerStarted: false
  }

  onPressAcceptRequest = () => {
    if (this.state.timerStarted) {
      console.log('Accept request', this.props.request)
      const request = this.props.request
      this.props.acceptRequest(
        request.eventId, request.user._id, this.props.auth.token
      )
      this.props.removeChatMessage(request.user._id, request._id)
      this.props.chat.socket.emit(DELETE_MESSAGE, request._id)
    }
  }

  onPressRejectRequest = () => {
    if (this.state.timerStarted) {
      console.log('Reject request', this.props.request)
      const request = this.props.request
      this.props.rejectRequest(
        request.eventId, request.user._id, this.props.auth.token
      )
      this.props.removeChatMessage(request.user._id, request._id)
      this.props.chat.socket.emit(DELETE_MESSAGE, request._id)
      const message = createChatMessage(
        this.props.user,
        `${request.text} rejected`
      )
      const typedMessage = {
        ...message,
        eventId: request.eventId,
        type: MESSAGE_TYPE_JOIN_REJECT
      }
      this.props.chat.socket.emit(SEND_MESSAGE, request.user._id, typedMessage)
    }
  }

  onProfilePicturePress = () => {
    console.log('this.props.request', this.props.request)
    if (this.state.timerStarted) {
    Actions.profile({
      origin: 'JoinRequest',
      otherUserId: this.props.request.user._id,
      forOtherUser: true
    })
    }
  }

  onViewRequest = () => {
    if (!this.state.timerStarted) {
      console.log('on view request')
      this.setState({ ...this.state, timerStarted: true })
    }
  }

  getOpacityStyle = (style, opacity) => {
    return this.showPreviewOverlay() ? { ...style, opacity } : style
  }

  showPreviewOverlay = () => {
    return !this.state.timerStarted
      && this.props.request.type !== MESSAGE_TYPE_JOIN_REJECT
  }

  renderViewRequestOverlay = () => {
    if (!this.showPreviewOverlay()) {
      return null
    }
    return (
      <TouchableOpacity
        style={styles.viewRequestContainerStyle}
        onPress={this.onViewRequest}
      >
        <Image
          style={styles.viewRequestButtonStyle}
          source={viewRequestButton}
        />
      </TouchableOpacity>
    )
  }

  renderButtons = () => {
    if (this.showPreviewOverlay()) {
      return null
    }
    return (
      <View>
        <ImageButton
          buttonSource={acceptButton}
          buttonWidth={100}
          handleOnPress={this.onPressAcceptRequest}
        />
        <ImageButton
          buttonSource={rejectButton}
          buttonWidth={100}
          handleOnPress={this.onPressRejectRequest}
        />
      </View>
    )
  }

  render() {
    console.log('JoinRequest', this.props.request)
    const request = this.props.request
    const avatar = request.user.avatar || ''
    const imageStyle = this.getOpacityStyle(styles.imageStyle, 0.05)
    const boldTextStyle = this.getOpacityStyle(styles.boldTextStyle, 0.1)
    const textStyle = this.getOpacityStyle(styles.textStyle, 0.1)

    return (
      <View style={styles.outerContainerStyle}>
        <View style={styles.containerStyle}>
          <TouchableOpacity onPress={this.onProfilePicturePress}>
            <Image style={imageStyle} source={getUserpicSource(avatar)} />
          </TouchableOpacity>
          <View style={styles.rightContainerStyle}>
            <Text style={boldTextStyle}>{request.user.name}</Text>
            <Text style={textStyle}>{request.text}</Text>
            <View style={styles.buttonContainerStyle}>
              {this.renderButtons()}
            </View>
          </View>
        </View>
        {this.renderViewRequestOverlay()}
        {!this.props.isLast ? <Item bordered /> : null}
      </View>
    )
  }
}

const styles = {
  outerContainerStyle: {
    flexDirection: 'column',
    marginLeft: -20,
    // borderWidth: 2,
    // borderColor: 'blue'
  },
  containerStyle: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 0,
    marginTop: 10,
    // borderWidth: 2,
    // borderColor: 'red'
  },
  rightContainerStyle: {
    marginLeft: 20,
    // borderWidth: 2,
    // borderColor: 'green'
  },
  textStyle: {
    color: 'white',
    letterSpacing: 2,
    fontSize: 12,
    width: 250
  },
  boldTextStyle: {
    color: 'white',
    letterSpacing: 2,
    marginBottom: 15,
    fontSize: 14,
    fontWeight: 'bold'
  },
  imageStyle: {
    marginTop: 10,
    marginLeft: 10,
    height: 70,
    borderRadius: 35,
    width: 70,
    borderColor: 'white',
    borderWidth: 4,
  },
  viewRequestContainerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    // borderWidth: 2,
    // borderColor: 'magenta'
  },
  viewRequestButtonStyle: {
    resizeMode: 'contain',
    width: overlayButtonWidth,
    marginLeft: 20
  },
  buttonContainerStyle: {
    flexDirection: 'row'
  }
}

const mapStateToProps = (state) => {
  return { chat: state.chat, user: state.user.user, auth: state.auth }
}
const actions = {
  acceptRequest,
  rejectRequest,
  removeChatMessage
}
export default connect(mapStateToProps, actions)(JoinRequest)
