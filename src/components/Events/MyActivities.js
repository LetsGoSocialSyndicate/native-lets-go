/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, Image, ScrollView } from 'react-native'
import { Text } from 'native-base'

import { CONTENT_WIDTH, CONTENT_HEIGHT } from '../common/Constants'
import MyActivity from './MyActivity'
import { fetchMyAllEventFeeds } from '../../actions/actionFeeds'

class MyActivities extends Component {
  componentWillMount() {
    this.props.fetchMyAllEventFeeds(this.props.user.user.email, this.props.auth.token)
  }

  renderActivityFeeds() {
    if (Object.values(this.props.eventFeeds).length === 0) {
      return (
        <Text style={ styles.textStyle }>
          View your upcoming activities here
        </Text>
      )
    }
    return (
      Object.values(this.props.eventFeeds)
        .map((event) => {
          if (event.join_request_rejected_by === null) {
            return (
              <MyActivity
                activity={ event } key={ event.event_id }/>
            )
          }
        })
    )
  }

  render() {
    return (
      <ScrollView style={ styles.containerStyle }>
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
    ...state.eventFeeds,
    user: state.user,
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchMyAllEventFeeds
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MyActivities)
