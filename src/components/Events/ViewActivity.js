/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
/* eslint-disable camelcase */
import moment from 'moment'
import { Text } from 'native-base'
import React, { Component } from 'react'
import { Image, ScrollView, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { handleRequest } from '../../actions/actionRequest'
import { formatEventDateTime, renderStatusIcons, renderJoinRequest } from '../common/ActivityUtils'
import { CONTENT_WIDTH, CONTENT_HEIGHT } from '../common/Constants'
import { getActivityImage, getUserpicSource } from '../common/ImageUtils'
import { getNickname } from '../common/UserUtils.js'
import { sendJoinRequest } from '../Messages/ChatUtils'

class ViewActivity extends Component {
  onPressRequestToJoin = () => {
    this.props.handleRequest(this.props.activity.event_id, this.props.auth.token)
      .then(() => Actions.myActivities({ origin: 'ActivityFeed' }))
    sendJoinRequest(this.props.activity, this.props.user, this.props.chat.socket)
  }

  render() {
    const {
      event_start_time,
      event_end_time,
      user_image_url,
      birthday,
      event_location,
      event_title,
      event_category,
      event_description
    } = this.props.activity
    const startTime = formatEventDateTime(event_start_time, 'starts')
    const endTime = formatEventDateTime(event_end_time, 'ends')
    const age = moment.duration(moment().diff(birthday)).years()
    const eventImage = getActivityImage(event_category)
    const nickname = getNickname(this.props.activity)

    return (
    <ScrollView style={styles.outterContainerStyle}>
      <View style={styles.containerStyle}>

        <View style={styles.captainSectionStyle}>
          <Image style={styles.profileImageStyle} source={getUserpicSource(user_image_url)} />
          <View style={styles.eventInfoStyle}>
            <Text style={styles.textHeaderStyle}>{nickname}, {age}</Text>
            <Text style={styles.textStyle}>{startTime}</Text>
            <Text style={styles.textStyle}>{endTime}</Text>
            <Text style={styles.textStyle}>{event_location}</Text>
          </View>
        </View>

        <Text style={styles.eventTitleStyle}>{event_title}</Text>

        <View style={styles.eventSectionStyle}>
          <Image style={styles.eventImageStyle} source={eventImage} />
          <Text style={styles.textStyle}>Crew: </Text>
          <Image style={styles.crewImageStyle} source={getUserpicSource(user_image_url)} />
        </View>

        <Text
          style={styles.descriptionTextStyle}
          multiline
          rowSpan={5}
        >
          {event_description}
        </Text>

        <View style={styles.statusIconContainerStyle}>
          {renderStatusIcons(this.props.activity, this.props.user)}
        </View>
        {renderJoinRequest(this.props.activity, this.onPressRequestToJoin)}
      </View>
    </ScrollView>
    )
  }
}

const styles = {
  outterContainerStyle: {
    backgroundColor: 'transparent',
    height: CONTENT_HEIGHT,
  },
  containerStyle: {
    width: CONTENT_WIDTH,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 40,
    paddingLeft: 30,
    paddingRight: 30,
  },
  captainSectionStyle: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    marginRight: 80
  },
  eventInfoStyle: {
    marginTop: 10,
    marginLeft: 10,
    flexDirection: 'column'
  },
  profileImageStyle: {
    height: 100,
    borderRadius: 50,
    width: 100,
    borderColor: 'white',
    borderWidth: 4
  },
  crewImageStyle: {
    height: 50,
    borderRadius: 25,
    width: 50,
    borderColor: 'white',
    borderWidth: 4
  },
  eventSectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventImageStyle: {
    marginRight: 10,
    height: 100,
    borderRadius: 50,
    width: 100,
    borderColor: 'white',
    borderWidth: 4
  },
  textHeaderStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 18,
    fontWeight: 'bold'
  },
  eventTitleStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  textStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 14,
  },
  descriptionTextStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 20,
    marginTop: 30,
    textAlign: 'center'
  },
  statusIconContainerStyle: {
    marginTop: 30,
    alignItems: 'center'
  },
}

const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.user.user, chat: state.chat }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  handleRequest,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewActivity)
