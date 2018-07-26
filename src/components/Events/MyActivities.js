/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import moment from 'moment'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { Text } from 'native-base'

import { CONTENT_WIDTH, CONTENT_HEIGHT } from '../common/Constants'
import MyActivity from './MyActivity'
import { fetchMyAllEventFeeds } from '../../actions/actionFeeds'

const timestamp = (event) => moment(event.event_start_time).valueOf()

class MyActivities extends Component {
  componentWillMount() {
    this.props.fetchMyAllEventFeeds(this.props.user.user.id,
      this.props.auth.token, false)
  }

  getCurrentEvents() {
    const now = moment()
    return Object.values(this.props.eventFeeds)
      .filter(event => {
        return moment(event.event_start_time) > now
      })
      .sort((a, b) => timestamp(b) - timestamp(a))
  }

  renderActivityFeeds() {
    if (Object.values(this.getCurrentEvents()).length === 0) {
      return (
        <Text style={styles.textStyle}>
          View your upcoming activities here
        </Text>
      )
    }
    return (
      this.getCurrentEvents()
      .filter(event => event.join_request_rejected_by === null)
      .map(event => (
            <MyActivity
              activity={event}
              key={event.event_id}
            />
      ))
    )
  }

  render() {
    return (
      <ScrollView style={styles.containerStyle}>
        { this.renderActivityFeeds() }
      </ScrollView>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 20,
    marginLeft: 0,
    width: CONTENT_WIDTH,
    height: CONTENT_HEIGHT
  },
  textStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20
  }
}

const mapStateToProps = (state) => {
  return {
    // ...state.eventFeeds,
    user: state.user,
    auth: state.auth,
    eventFeeds: state.eventFeeds.eventFeeds,
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMyAllEventFeeds
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyActivities)
