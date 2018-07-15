/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ImageBackground, Dimensions } from 'react-native'
import { Text, Card, CardItem, Item, Body, Container } from 'native-base'
import { ImageButton } from '../common'

import { handleRequest } from '../../actions/actionRequest'
const requestToJoinButton = require('../../assets/buttons/request_to_join.png')
const backgroundImage = require('../../assets/assets_5.28-06.png')
const { width } = Dimensions.get('window');

class ActivityFeed extends Component {
  render() {
    const eventDate = {
      date: new Date(this.props.activity.event_start_time).toDateString().substr(4,7),
      time: (this.props.activity.event_start_time).substr(11,5)
    }
    const {
      textStyle, cardItemStyle, imageStyle
    } = styles
    return (
      <Item bordered style={ cardItemStyle }>
        <ImageBackground
          source={ backgroundImage }
          style={ imageStyle }>
          <Text style={ textStyle }>{ eventDate.date }</Text>
          <Text style={ textStyle }>{ eventDate.time }</Text>
        </ImageBackground>
      </Item>
    )
  }
}

const styles = {
  imageStyle: {
    width: width,
    height: '100%',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0
  },
  textStyle: {
<<<<<<< HEAD
    marginTop: 5,
    color: '#FFF',
=======
    color: 'black',
>>>>>>> 7e886386ecd9440ca989c7d1eed2afc381054488
    letterSpacing: 2,
    height: 30
  },
  cardItemStyle: {
    height: 400,
    width: width,
    backgroundColor: 'transparent',
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    zIndex: 80
  }
}

const dispatchToProps = (dispatch) => bindActionCreators({
  handleRequest
}, dispatch)

export default connect(null, dispatchToProps)(ActivityFeed)
