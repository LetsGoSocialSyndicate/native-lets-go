/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { Image, View, TouchableOpacity } from 'react-native'
import { Text, Item } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { ImageButton } from '../common'
import { acceptRequest, rejectRequest } from '../../actions/actionRequest'
import {
  CONTENT_WIDTH
} from '../common/Constants'

const acceptButton = require('../../assets/buttons/accept.png')
const viewRequestButton = require('../../assets/buttons/view_request.png')
const overlayButtonWidth = CONTENT_WIDTH - 50
class JoinRequest extends Component {
  onPressAcceptRequest = () => {
    console.log('Accept request')
  }

  onProfilePicturePress = () => {
    console.log('this.props.request', this.props.request)
    //Actions.profile({ origin: 'JoinRequest', otherUserInfo: this.props.request.user, forOtherUser: true })
  }

  onViewRequest = () => {
    console.log('on view request')
  }

  render() {
    const { containerStyle, imageStyle, outerContainerStyle,
      boldTextStyle, textStyle, rightContainerStyle,
      viewRequestButtonStyle, viewRequestContainerStyle
    } = styles
    console.log('JoinRequest', this.props.request)

    return (
      <View style={ outerContainerStyle }>
        <View style={ containerStyle }>
          <TouchableOpacity onPress={ this.onProfilePicturePress }>
            <Image style={ imageStyle } source={{ uri: this.props.request.user.avatar }} />
          </TouchableOpacity>
          <View style={ rightContainerStyle }>
            <Text style={ boldTextStyle }>{ this.props.request.user.name }</Text>
            <Text style={ textStyle }>{ this.props.request.text }</Text>
            <ImageButton buttonSource={ acceptButton }
              buttonWidth={ 100 }
              handleOnPress={ this.onPressAcceptRequest }/>
          </View>
        </View>
        <TouchableOpacity style={ viewRequestContainerStyle }
          onPress={ this.onViewRequest }>
          <Image style={ viewRequestButtonStyle }
            source={ viewRequestButton } />
        </TouchableOpacity>
        { !this.props.isLast ? <Item bordered /> : null }
      </View>
    )
  }
}

const styles = {
  outerContainerStyle: {
    flexDirection: 'column',
    marginLeft: -20
  },
  containerStyle: {
    flexDirection: 'row',
    marginLeft: 20,
    marginBottom: 0,
    marginTop: 10,
    opacity: 0.4
  },
  rightContainerStyle: {
    marginLeft: 20,
  },
  textStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 12,
    width: 250
  },
  boldTextStyle: {
    color: '#FFF',
    letterSpacing: 2,
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
    borderWidth: 4
  },
  viewRequestContainerStyle: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  viewRequestButtonStyle: {
    resizeMode: 'contain',
    width: overlayButtonWidth,
    marginLeft: 20
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  acceptRequest,
  rejectRequest
}, dispatch)

export default connect(null, mapDispatchToProps)(JoinRequest)
