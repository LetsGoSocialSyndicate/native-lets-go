/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { Image, View } from 'react-native'
import { Text, Textarea } from 'native-base'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { handleRequest } from '../../actions/actionRequest'
import { CONTENT_WIDTH } from '../common/Constants'
import { getActivityImage } from '../common/imageUtils'
import { ImageButton } from '../common'
const requestToJoinButton = require('../../assets/buttons/request_to_join.png')

class ViewActivity extends Component {
  onPressRequestToJoin = () => {
    const { user_id, event_id } = this.props.activity
    this.props.handleRequest(event_id, user_id, this.props.auth.token)
  }
  render() {
    const {
      event_start_time, event_end_time,
      user_image_url, first_name, last_name, birthday,
      event_location, event_title, event_category, event_description
    } = this.props.activity
    const eventDate = {
      start_date: new Date(event_start_time).toDateString().substr(4,7),
      start_time: (event_start_time).substr(11,5),
      end_date: new Date(event_end_time).toDateString().substr(4,7),
      end_time: (event_end_time).substr(11,5)
    }
    const {
      containerStyle, textStyle, textHeaderStyle,
      captainSectionStyle, descriptionTextStyle,
      eventInfoStyle, profileImageStyle,
      eventSectionStyle, crewImageStyle,
      eventTitleStyle, eventImageStyle
    } = styles
    const age = moment.duration(moment().diff(birthday)).years()
    const eventImage = getActivityImage(event_category)

    return (
      <View style={ containerStyle }>
        <View style={ captainSectionStyle }>
          <Image style={ profileImageStyle } source={{ uri: user_image_url }} />
          <View style={ eventInfoStyle }>
            <Text style={ textHeaderStyle }>{ first_name } { last_name }, {age}</Text>
            <Text style={ textStyle }>{ `starts on ${eventDate.start_date} at ${eventDate.start_time}` }</Text>
            <Text style={ textStyle }>{ `ends on ${eventDate.end_date} at ${eventDate.end_time}` }</Text>
            <Text style={ textStyle }>{ event_location }</Text>
          </View>
        </View>
        <Text style={ eventTitleStyle }>{ event_title }</Text>
        <View style={ eventSectionStyle }>
          <Image style={ eventImageStyle } source={ eventImage } />
          <Text style={ textStyle }>Crew: </Text>
          <Image style={ crewImageStyle } source={{ uri: user_image_url }} />
        </View>
        <Text style={ descriptionTextStyle }
          multiline rowSpan={5}>{ event_description }</Text>
        <ImageButton buttonSource={ requestToJoinButton }
          handleOnPress={ this.onPressRequestToJoin }/>
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
  return { auth: state.auth }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  handleRequest
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ViewActivity)
