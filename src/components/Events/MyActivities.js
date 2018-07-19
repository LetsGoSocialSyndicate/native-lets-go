/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Text } from 'native-base'

import MyActivity from './MyActivity'

class MyActivities extends Component {
  render() {
    return (
      <View>
        <MyActivity />
      </View>
    )
  }
}

export default MyActivities
