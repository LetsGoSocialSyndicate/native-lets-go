/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'
import { Text, Item } from 'native-base'

import { getActivityImage } from '../common/imageUtils'
const requestSent = require('../../assets/request-sent.png')
const requestAccepted = require('../../assets/request-accepted.png')
const captained = require('../../assets/captain.png')

class MyActivity extends Component {
  renderStatus() {
    const { id } = this.props.user
    const { event_posted_by, join_requested_by,
      join_request_accepted_by, join_request_rejected_by
    } = this.props.activity
    const { eventStatusImageStyle } = styles
    if (id === event_posted_by) {
      // hosting
      return (
        <Image style={ eventStatusImageStyle } source={ captained } />
      )
    }
    else if (id === join_requested_by) {
      // participating
      if (join_request_accepted_by === null &&
          join_request_rejected_by === null) {
        return (
          <Image style={ eventStatusImageStyle } source={ requestSent } />
        )
      }
      else if (join_request_accepted_by !== null) {

      }
    }
  }

  render() {
    const {
      event_start_time, user_image_url,
      event_location, event_title, event_category
    } = this.props.activity
    const eventDate = {
      date: new Date(event_start_time).toDateString().substr(4,7),
      time: (event_start_time).substr(11,5)
    }
    const { containerStyle, eventImageStyle,
      crewImageStyle, crewContainer,
      eventInfoStyle, textStyle, eventTitleStyle
    } = styles
    const eventImage = getActivityImage(event_category)
    return (
      <View>
        <View style={ containerStyle }>
          <Image style={ eventImageStyle } source={ eventImage } />
          <View style={ eventInfoStyle }>
            <Text style={ eventTitleStyle }>{ event_title }</Text>
            <Text style={ textStyle }>{ `on ${eventDate.date} at ${eventDate.time}` }</Text>
            <Text style={ textStyle }>{ event_location }</Text>
            <View style={ crewContainer }>
              <Text style={ textStyle }>Crew: </Text>
              <Image style={ crewImageStyle } source={{ uri: user_image_url }} />
            </View>
          </View>
          <View>
            { this.renderStatus() }
          </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  eventImageStyle: {
    marginTop: 10,
    marginLeft: 10,
    height: 80,
    borderRadius: 40,
    width: 80,
    borderColor: 'white',
    borderWidth: 4
  },
  eventStatusImageStyle: {
    marginLeft: 20,
    height: 40,
    width: 40
  },
  eventInfoStyle: {
    marginLeft: 10,
    width: 170,
    flexDirection: 'column'
  },
  textStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 12,
  },
  eventTitleStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 16,
    fontWeight: 'bold'
  },
  crewImageStyle: {
    marginTop: 5,
    height: 40,
    borderRadius: 20,
    width: 40,
    borderColor: 'white',
    borderWidth: 4
  },
  crewContainer: {
    flexDirection: 'row'
  }
}

const mapStateToProps = (state) => {
  return { ...state.user }
}

export default connect(mapStateToProps)(MyActivity)
