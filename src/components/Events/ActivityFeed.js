/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Text, Card, CardItem, Item, Body, Container } from 'native-base'
import { ImageButton } from '../common'

import { handleRequest } from '../../actions/actionRequest'
const requestToJoinButton = require('../../assets/buttons/request_to_join.png')
const backgroundImage = require('../../assets/assets_5.28-06.png')
import { CONTENT_WIDTH } from '../common/Constants'

class ActivityFeed extends Component {
  render() {
    const eventDate = {
      date: new Date(this.props.activity.event_start_time).toDateString().substr(4,7),
      time: (this.props.activity.event_start_time).substr(11,5)
    }
    const {
      containerStyle, textStyle,
      cardItemStyle, imageStyle
    } = styles
    return (
      <View style={ containerStyle }>
        <View>
          <Image style={imageStyle} source={{ uri: this.props.activity.user_image_url }} />
        </View>
        <Item bordered >
          <Text style={ textStyle }>{ eventDate.date }</Text>
          <Text style={ textStyle }>{ eventDate.time }</Text>
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
  imageStyle: {
    marginTop: 10,
    marginLeft: 10,
    height: 70,
    borderRadius: 35,
    width: 70,
    borderColor: 'white',
    borderWidth: 4
  },
  textStyle: {
    marginTop: 5,
    color: '#FFF',
    letterSpacing: 2,
    height: 30
  },
  cardItemStyle: {
    // height: 200,
    width: CONTENT_WIDTH,
    backgroundColor: 'transparent'
  }
}

const dispatchToProps = (dispatch) => bindActionCreators({
  handleRequest
}, dispatch)

export default connect(null, dispatchToProps)(ActivityFeed)
