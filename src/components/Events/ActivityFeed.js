/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ImageBackground } from 'react-native'
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
      textStyle, cardItemStyle, imageStyle
    } = styles
    return (
      <Item bordered style={ cardItemStyle }>
        <Text style={ textStyle }>{ eventDate.date }</Text>
        <Text style={ textStyle }>{ eventDate.time }</Text>
      </Item>
    )
  }
}

const styles = {
  imageStyle: {
    width: CONTENT_WIDTH,
    height: '100%',
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0
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
    // backgroundColor: 'transparent'
  }
}

const dispatchToProps = (dispatch) => bindActionCreators({
  handleRequest
}, dispatch)

export default connect(null, dispatchToProps)(ActivityFeed)

/*
<ImageBackground
  source={ backgroundImage }
  style={ imageStyle }>
  <Text style={ textStyle }>{ eventDate.date }</Text>
  <Text style={ textStyle }>{ eventDate.time }</Text>
</ImageBackground>
*/
