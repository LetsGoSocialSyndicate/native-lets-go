/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { View, TouchableHighlight, Image } from 'react-native'
import { Container } from 'native-base'
import ActivityFeed from './ActivityFeed'
import { fetchEventFeeds } from '../../actions/actionFeeds'

import { CONTENT_WIDTH, CONTENT_HEIGHT } from '../common/Constants'
const filterButton = require('../../assets/buttons/filter.png')

class ActivityFeeds extends Component {
  componentWillMount() {
    this.props.fetchEventFeeds(this.props.token)
  }

  renderActivityFeeds() {
    return (
      Object.values(this.props.eventFeeds)
        .map((event) => {
          return (
            <ActivityFeed
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

const mapStateToProps = (state) => ({ ...state.eventFeeds, ...state.user, ...state.auth })

const dispatchToProps = (dispatch) => bindActionCreators({
  fetchEventFeeds
}, dispatch)

export default connect(mapStateToProps, dispatchToProps)(ActivityFeeds)
