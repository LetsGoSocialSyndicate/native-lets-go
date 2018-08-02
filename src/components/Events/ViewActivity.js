/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
/* eslint-disable camelcase */
import moment from 'moment'
import { Text } from 'native-base'
import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { handleRequest } from '../../actions/actionRequest'
import { renderJoinRequestButtonOrIcon } from '../common/ActivityUtils'
import { CONTENT_WIDTH } from '../common/Constants'
import { getActivityImage, getUserpicSource } from '../common/imageUtils'
import { sendJoinRequest } from '../Messages/ChatUtils'

class ViewActivity extends Component {
  onPressRequestToJoin = () => {
    this.props.handleRequest(this.props.activity.event_id, this.props.auth.token)
      .then(() => Actions.myActivities({ origin: 'ActivityFeed' }))
    sendJoinRequest(this.props.activity, this.props.user, this.props.chat.socket)
  }

  render() {
    const {
      event_start_time, event_end_time,
      user_image_url, first_name, last_name, birthday,
      event_location, event_title, event_category, event_description
    } = this.props.activity
    const startTime = moment(event_start_time).format('[starts on] MMM DD [at] hh:mma')
    const endTime = moment(event_end_time).format('[ends on] MMM DD [at] hh:mma')
    const age = moment.duration(moment().diff(birthday)).years()
    const eventImage = getActivityImage(event_category)

    return (
      <View style={styles.containerStyle}>
        <View style={styles.captainSectionStyle}>
          <Image style={styles.profileImageStyle} source={getUserpicSource(user_image_url)} />
          <View style={styles.eventInfoStyle}>
            <Text style={styles.textHeaderStyle}>{first_name} {last_name}, {age}</Text>
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
        {renderJoinRequestButtonOrIcon(
          this.props.activity,
          this.props.user,
          this.onPressRequestToJoin
        )}
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    width: CONTENT_WIDTH,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  captainSectionStyle: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20
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
    marginBottom: 20
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
    marginTop: 30
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.user.user, chat: state.chat }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  handleRequest,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewActivity)
