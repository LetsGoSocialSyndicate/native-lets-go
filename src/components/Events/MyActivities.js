/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import moment from 'moment'
import { Text } from 'native-base'
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchMyAllEventFeeds } from '../../actions/actionFeeds'
import { CONTENT_HEIGHT, CONTENT_WIDTH } from '../common/Constants'
import MyActivity from './MyActivity'

class MyActivities extends Component {
  componentDidMount() {
    // console.log('MyActivities.componentDidMount', this.props)
    this.props.fetchMyAllEventFeeds(this.props.user.user.id,
      this.props.auth.token, false)
  }

  getCurrentEvents = () => {
    const now = moment()
    return Object.values(this.props.eventFeeds)
      .filter(event => {
        return moment(event.event_start_time) > now
      })
  }

  renderActivityFeeds = () => {
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
    // console.log('MyActivities.render', this.props)
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
