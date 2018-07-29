/* Copyright 2018, Socializing Syndicate Corp. */
/* eslint-disable radix */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Item, Text, Spinner, Thumbnail } from 'native-base'
import { countMyAllEventFeeds } from '../../actions/actionFeeds'

class ProfileActivitiesContainer extends Component {
  componentDidMount() {
    console.log('ProfileActivitiesContainer.componentDidMount', this.props)
    this.props.countMyAllEventFeeds(this.props.userWrapper.getId(), this.props.auth.token)
  }
  getThumbnail(isReady) {
    if (!isReady) {
      return <Spinner style={styles.userImageSmall} color='red' />
    }
    return (
      <Thumbnail
       style={styles.userImageSmall}
       source={{ uri: this.props.userpic }}
      />
    )
  }

  getHeader(isReady) {
    return (
      <Item bordered style={{ justifyContent: 'center' }} >
        {this.getThumbnail(isReady)}
      </Item>
    )
  }

  render() {
    console.log('ProfileActivitiesContainer.render', this.props)
    const statistics = this.props.eventFeeds.statistics
    if (!statistics || this.props.eventFeeds.isLoading) {
      return (
        <View>
          {this.getHeader(false)}
          <View style={{ paddingBottom: 90 }} />
        </View>
      )
    }
    const acitivityCount =
      parseInt(statistics.countJoined) + parseInt(statistics.countHosted)

    return (
      <View>
        {this.getHeader(true)}
        <View style={styles.numOfActivitiesStyle}>
          <View style={styles.rowStyle}>
            <View style={styles.activitiesCol1Style}>
              <Text style={styles.numberStyle}>{acitivityCount}</Text>
              <Text style={styles.activitiesStyle}>activities</Text>
            </View>
            <View style={styles.activitiesCol2Style}>
              <Text style={styles.numberStyle}>{statistics.countHosted}</Text>
              <Text style={styles.activitiesStyle}>captained</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  userImageSmall: {
    width: 55,
    height: 55,
    borderColor: '#fff',
    borderWidth: 3,
    position: 'absolute'
  },
   numOfActivitiesStyle: {
     flexDirection: 'column',
     marginTop: 10,
   },
   rowStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
   },
   activitiesCol1Style: {
     alignItems: 'center',
     paddingLeft: 20
   },
   activitiesCol2Style: {
     alignItems: 'center',
     paddingRight: 20
   },
   numberStyle: {
     color: '#fff',
     fontSize: 45
   },
   activitiesStyle: {
     color: '#fff',
     fontSize: 18
   }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    eventFeeds: state.eventFeeds
  }
}
const actions = {
  countMyAllEventFeeds
}
export default connect(mapStateToProps, actions)(ProfileActivitiesContainer)
