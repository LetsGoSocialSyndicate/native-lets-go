/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
 /* eslint-disable no-else-return */
import React, { Component } from 'react'
import { Item, Text } from 'native-base'
import { Image, TouchableOpacity, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { removeChatMessage } from '../../actions/actionChat'
import { acceptRequest, rejectRequest } from '../../actions/actionRequest'
import { ImageButton } from '../common'
import { CONTENT_WIDTH } from '../common/Constants'
import { getUserpicSource } from '../common/ImageUtils'
import {
  DELETE_MESSAGE,
  SEND_MESSAGE,
  MESSAGE_TYPE_JOIN_REQUEST,
  MESSAGE_TYPE_JOIN_REJECT
} from './ChatProtocol'
import { createChatMessage } from '../Messages/ChatUtils'

const viewRequestButton = require('../../assets/buttons/view_request.png')
const declineButton = require('../../assets/chatJoinReq/decline.png')
const acceptButton = require('../../assets/chatJoinReq/accept.png')

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
        request.text
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
    if (!this.showPreviewOverlay()) {
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

  isJoinRequest = () => {
    return this.props.request.type === MESSAGE_TYPE_JOIN_REQUEST
  }

  isRejectMessage = () => {
    return this.props.request.type === MESSAGE_TYPE_JOIN_REJECT
  }

  showPreviewOverlay = () => {
    return !this.state.timerStarted && this.isJoinRequest()
  }

  renderText = () => {
    if (this.isJoinRequest()) {
      const textStyle = this.getOpacityStyle(styles.textStyle, 0.1)
      return (
        <Text style={textStyle}>{this.props.request.text}</Text>
      )
    } else {
      // TODO check separately accept vs reject
      return (
        <View>
          <Text style={styles.textStyle}>{this.props.request.text}</Text>
          <Text style={styles.declineStyle}>Declined</Text>
        </View>
      )
    }
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
    if (this.showPreviewOverlay() || !this.isJoinRequest()) {
      return null
    }
    return (
      <View style={styles.buttonContainerStyle}>
        <ImageButton
          buttonSource={acceptButton}
          buttonWidth={120}
          buttonHeight={40}
          handleOnPress={this.onPressAcceptRequest}
        />
        <ImageButton
          buttonSource={declineButton}
          buttonWidth={120}
          buttonHeight={40}
          handleOnPress={this.onPressRejectRequest}
        />
      </View>
    )
  }

  render() {
    // console.log('JoinRequest', this.props.request)
    const request = this.props.request
    const avatar = request.user.avatar || ''
    const imageStyle = this.getOpacityStyle(styles.imageStyle, 0.05)
    const boldTextStyle = this.getOpacityStyle(styles.boldTextStyle, 0.1)

    return (
      <View>
        <View style={styles.outerContainerStyle}>
          <View style={styles.containerStyle}>
            <TouchableOpacity onPress={this.onProfilePicturePress}>
              <Image style={imageStyle} source={getUserpicSource(avatar)} />
            </TouchableOpacity>
            <View style={styles.rightContainerStyle}>
              <Text style={boldTextStyle}>{request.user.name}</Text>
              {this.renderText()}
            </View>

          </View>

        </View>

          {this.renderButtons()}


        {this.renderViewRequestOverlay()}
        {/* {!this.props.isLast ? <Item bordered /> : null} */}
        <Item bordered />
      </View>
    )
  }
}

const styles = {
  outerContainerStyle: {
    flexDirection: 'column',
    marginLeft: -20,
    marginBottom: 20,
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
    marginRight: 50,
    //paddingRight: 50,
    // borderWidth: 2,
    // borderColor: 'green'
  },
  textStyle: {
    color: 'white',
    letterSpacing: 2,
    fontSize: 12,
    paddingRight: 50,
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
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    // borderWidth: 2,
    // borderColor: 'orange',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  declineStyle: {
    color: '#1B5187',
    fontWeight: 'bold'
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
