/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ImageBackground } from 'react-native'
import { Text, Container, Content, Card, CardItem, Body } from 'native-base'
import { ImageButton } from '../common'

import { handleRequest } from '../../actions/actionRequest'
const requestToJoinButton = require('../../assets/buttons/request_to_join.png')
const backgroundImage = require('../../assets/1_a_base_02.png')

class ActivityFeed extends Component {
  render() {
    const eventDate = {
      date: new Date(this.props.activity.event_start_time).toDateString().substr(4,7),
      time: (this.props.activity.event_start_time).substr(11,5)
    }
    const {
      thumbnailContainerStyle, textStyle,
      imageStyle, cardStyle
    } = styles
    console.log('=====', eventDate)
    return (
      <Text style={ textStyle }>{ eventDate.date }</Text>
    )
  }
}

const styles = {
  cardStyle: {
    flex: 1
  },
  textStyle: {
    marginTop: 5,
    color: '#000',
    letterSpacing: 2,
    height: 30
  },
  imageStyle: {
    height: 100,
    width: 100,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'white'
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 1,
    marginRight: 10
  }
}

const dispatchToProps = (dispatch) => bindActionCreators({
  handleRequest
}, dispatch)

export default connect(null, dispatchToProps)(ActivityFeed)
