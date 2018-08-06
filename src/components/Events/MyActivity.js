/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable camelcase */
import { Text, Item } from 'native-base'
import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { formatRelativeEventDateTime } from '../common/ActivityUtils'
import { getActivityImage, getUserpicSource } from '../common/ImageUtils'
import LoadingButton from '../common/LoadingButton'

const requestSent = require('../../assets/oneActivity/sent.png')
const requestAccepted = require('../../assets/oneActivity/accepted.png')
const captained = require('../../assets/oneActivity/captained.png')

class MyActivity extends Component {
  onActivityPicturePress = () => {
    Actions.viewActivity({
      origin: 'ActivityFeed',
      activity: this.props.activity
    })
  }

  // TODO: Need to pass user properties or id
  onProfilePicturePress = () => {
    // console.log('this.props.activity', this.props.activity)
    // TODO: Need to fetch user correspoinding to this crew member, and
    // show spinner while loading
    Actions.profile({
      origin: 'MyActivity',
      otherUserInfo: this.props.activity,
      forOtherUser: true
    })
  }

  renderStatus = () => {
    const { id } = this.props.user
    const { event_posted_by, join_requested_by,
      join_request_accepted_by, join_request_rejected_by
    } = this.props.activity
    const { eventStatusImageStyle } = styles
    if (id === event_posted_by) {
      // hosting
      return <Image style={eventStatusImageStyle} source={captained} />
    } else if (id === join_requested_by) {
      // participating
      if (join_request_accepted_by === null &&
          join_request_rejected_by === null) {
        return <Image style={eventStatusImageStyle} source={requestSent} />
      } else if (join_request_accepted_by !== null) {
        return <Image style={eventStatusImageStyle} source={requestAccepted} />
      }
    }
  }

  render() {
    // console.log('MyActivity.render', this.props)
    const {
      event_start_time, user_image_url,
      event_location, event_title, event_category
    } = this.props.activity
    const eventDateTime = formatRelativeEventDateTime(event_start_time)
    const eventImage = getActivityImage(event_category)
    return (
      <View>
        <View style={styles.containerStyle}>
          <TouchableOpacity onPress={this.onActivityPicturePress}>
            <Image style={styles.eventImageStyle} source={eventImage} />
          </TouchableOpacity>
          <View style={styles.eventInfoStyle}>
            <Text style={styles.eventTitleStyle}>{event_title}</Text>
            <Text style={styles.textStyle}>{eventDateTime}</Text>
            <Text style={styles.textStyle}>{event_location}</Text>
            <View style={styles.crewContainer}>
              {/* TODO: Add all crew, maybe server resposne should already contani this */}
              <Text style={styles.textStyle}>Crew: </Text>
              <LoadingButton
                onPress={this.onProfilePicturePress}
                imageStyle={styles.crewImageStyle}
                source={getUserpicSource(user_image_url)}
              />
            </View>
          </View>
          <View>
            { this.renderStatus() }
          </View>
        </View>
        <Item bordered>
          <Text />
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
