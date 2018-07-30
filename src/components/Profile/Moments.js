/* Copyright 2018, Socializing Syndicate Corp. */
import React, { Component } from 'react'
import { View } from 'react-native'
import { Text } from 'native-base'
import { connect } from 'react-redux'
import OneMoment from './OneMoment'
import { CONTENT_WIDTH } from '../common/Constants'
import { fetchMyAllEventFeeds } from '../../actions/actionFeeds'

class Moments extends Component {
  componentDidMount() {
    this.props.fetchMyAllEventFeeds(this.props.userWrapper.getId(),
      this.props.auth.token, true)
  }

  renderActivityFeeds() {
    const eventFeeds = Object.values(this.props.eventFeeds)
    if (eventFeeds.length === 0) {
      return (
        <Text style={styles.textStyle}>
          Join or create activities to grow your Moments
        </Text>
      )
    }
    return (
      eventFeeds.map(event => (
        <OneMoment key={event.event_id} activity={event} />
      ))
    )
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
    width: CONTENT_WIDTH,
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
    auth: state.auth,
    eventFeeds: state.eventFeeds.eventFeeds,
  }
}

const actions = {
  fetchMyAllEventFeeds
}

export default connect(mapStateToProps, actions)(Moments)
