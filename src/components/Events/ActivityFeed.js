/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Text } from 'native-base'
import { ImageButton } from '../common'

import { handleRequest } from '../../actions/actionRequest'
const requestToJoinButton = require('../../assets/buttons/request_to_join.png')

class ActivityFeed extends Component {
  render() {
    console.log(this.props.activity)
    let eventDate = {
      date: new Date(this.props.activity.event_start_time).toDateString().substr(4,7),
      time: (this.props.activity.event_start_time).substr(11,5)
    }
    return (
      <View>
        <Text style={ styles.textStyle }>{ eventDate.date }</Text>
        <Text style={ styles.textStyle }>{ eventDate.time }</Text>
      </View>
    )
  }
}

const styles = {
  textStyle: {
    color: 'white',
    letterSpacing: 2,
  }
}

const dispatchToProps = (dispatch) => bindActionCreators({
  handleRequest
}, dispatch)

export default connect(null, dispatchToProps)(ActivityFeed)
