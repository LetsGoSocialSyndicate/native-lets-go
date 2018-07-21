/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import ActivityFeed from './ActivityFeed'
import { fetchOtherEventFeeds } from '../../actions/actionFeeds'
import { CONTENT_WIDTH } from '../common/Constants'

// const filterButton = require('../../assets/buttons/filter.png')

class ActivityFeeds extends Component {
  componentWillMount() {
    this.props.fetchOtherEventFeeds(this.props.user, this.props.token)
  }

  renderActivityFeeds() {
    return (
      Object.values(this.props.eventFeeds)
        .map((event) => {
          return (
            <ActivityFeed
              activity={event}
              key={event.event_id}
            />
          )
        })
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
    marginTop: 10,
    width: CONTENT_WIDTH
  }
}

const mapStateToProps = (state) => ({ ...state.eventFeeds, ...state.user, ...state.auth })

const dispatchToProps = (dispatch) => bindActionCreators({
  fetchOtherEventFeeds
}, dispatch)

export default connect(mapStateToProps, dispatchToProps)(ActivityFeeds)
