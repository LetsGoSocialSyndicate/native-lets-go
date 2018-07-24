/* Copyright 2018, Socializing Syndicate Corp. */
import moment from 'moment'
import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import OneMoment from './OneMoment'
import { CONTENT_WIDTH } from '../common/Constants'
import { fetchMyAllEventFeeds } from '../../actions/actionFeeds'

const timestamp = (event) => moment(event.event_start_time).valueOf()

class Moments extends Component {
  componentDidMount() {
      console.log('Moments.componentDidMount', this.props)
      this.props.fetchMyAllEventFeeds(this.props.user.user, this.props.auth.token)
  }

  getCurrentEvents() {
    const now = moment()
    return Object.values(this.props.eventFeeds).filter(
      event => moment(event.event_start_time) < now
    ).sort((a, b) => timestamp(b) - timestamp(a))
  }

  renderActivityFeeds() {
    return this.getCurrentEvents().map(event => (
      <OneMoment
        key={event.event_id}
        activity={event}
      />
    ))
  }
  render() {
    return (
      <View style={styles.containerStyle}>
        { this.renderActivityFeeds() }
      </View>
    )
  }
}


const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 10,
    width: CONTENT_WIDTH
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.auth,
    eventFeeds: state.eventFeeds.eventFeeds,
  }
}
const actions = {
  fetchMyAllEventFeeds
}
export default connect(mapStateToProps, actions)(Moments)
