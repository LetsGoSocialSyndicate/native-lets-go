/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Image, View } from 'react-native'
import { Text, Card, CardItem, Item, Body, Container } from 'native-base'
import moment from 'moment'
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
      containerStyle, textStyle, textHeaderStyle,
      rowStyle, eventInfoStyle, eventSectionStyle,
      cardItemStyle, imageStyle, organizerSectionStyle,
      eventTitleStyle
    } = styles
    const {
      user_image_url, first_name, last_name, birthday,
      event_location, event_title
    } = this.props.activity
    const age = moment.duration(moment().diff(birthday)).years()
    return (
      <View style={ containerStyle }>
        <View style={ organizerSectionStyle }>
          <Image style={imageStyle} source={{ uri: user_image_url }} />
          <View style={ eventInfoStyle }>
            <Text style={ textHeaderStyle }>{ first_name.toUpperCase() } { last_name.toUpperCase() }, {age}</Text>
            <Text style={ textStyle }>{ `on ${eventDate.date} at ${eventDate.time}` }</Text>
            <Text style={ textStyle }>{ event_location }</Text>
          </View>
        </View>
        <View style={ eventSectionStyle }>
          <Text style={ eventTitleStyle }>{ event_title }</Text>
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
    marginTop: 15,
    marginLeft: 10,
    flexDirection: 'column'
  },
  rowStyle: {
    flexDirection: 'row'
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
