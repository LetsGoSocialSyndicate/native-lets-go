/* Copyright 2018, Socializing Syndicate Corp. */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Text, Spinner } from 'native-base'
import { countMyAllEventFeeds } from '../../actions/actionFeeds'

class ProfileActivitiesContainer extends Component {
  componentDidMount() {
      console.log('ProfileActivitiesContainer.componentDidMount', this.props)
      this.props.countMyAllEventFeeds(this.props.user.user, this.props.auth.token)
  }
  render() {
    console.log('ProfileActivitiesContainer.render', this.props)
    const statistics = this.props.eventFeeds.statistics
    if (!statistics || this.props.eventFeeds.isLoading) {
      return <Spinner color='red' />
    }

    const {
      numOfActivitiesStyle,
      rowStyle,
      activitiesCol1Style,
      activitiesCol2Style,
      numberStyle,
      activitiesStyle
    } = styles

    return (
      <View style={numOfActivitiesStyle}>
        <View style={rowStyle}>
          <View style={activitiesCol1Style}>
            <Text style={numberStyle}>{statistics.countJoined}</Text>
            <Text style={activitiesStyle}>activities</Text>
          </View>
          <View style={activitiesCol2Style}>
            <Text style={numberStyle}>{statistics.countHosted}</Text>
            <Text style={activitiesStyle}>captained</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
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
    user: state.user,
    auth: state.auth,
    eventFeeds: state.eventFeeds
  }
}
const actions = {
  countMyAllEventFeeds
}
export default connect(mapStateToProps, actions)(ProfileActivitiesContainer)
