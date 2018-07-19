/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, Image } from 'react-native'
import { Text, Container } from 'native-base'

import { CONTENT_WIDTH, CONTENT_HEIGHT } from '../common/Constants'
import MyActivity from './MyActivity'
import { fetchMyAllEventFeeds } from '../../actions/actionFeeds'

class MyActivities extends Component {
  componentWillMount() {
    this.props.fetchMyAllEventFeeds(this.props.user.user, this.props.auth.token)
  }

  renderActivityFeeds() {
    return (
      Object.values(this.props.eventFeeds)
        .map((event) => {
          return (
            <MyActivity
              activity={ event } key={ event.event_id }/>
          )
        })
    )
  }

  render() {
    return (
      <Container style={ styles.containerStyle }>
        { this.renderActivityFeeds() }
      </Container>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    marginTop: 10,
    width: CONTENT_WIDTH,
    height: CONTENT_HEIGHT
  }
}

const mapStateToProps = (state) => {
  return { ...state.eventFeeds, user: state.user, auth: state.auth }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMyAllEventFeeds
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyActivities)
