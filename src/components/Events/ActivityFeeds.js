/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { View, ImageBackground, Image, Dimensions } from 'react-native'
import { List, ListItem, Text, Container } from 'native-base'
import ActivityFeed from './ActivityFeed'
import { fetchEventFeeds } from '../../actions/actionFeeds'
import { logout } from '../../actions/authAction'

const { width, height } = Dimensions.get('window');

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
    marginTop: -1,
    width: width,
    zIndex: 90
  }
}

const mapStateToProps =  (state) => ({ ...state.eventFeeds, ...state.user, ...state.auth })

const dispatchToProps = (dispatch) => bindActionCreators({
  fetchEventFeeds,
  logoutAction: logout
}, dispatch)

export default connect(mapStateToProps, dispatchToProps)(ActivityFeeds)


/*
<Container>
<Card>
  <CardSection>
    <Button onPress={() => Actions.profile({ forOtherUser: false })}>
      Profile
    </Button>
  </CardSection>
  <CardSection>
    <Button onPress={logoutAction}>
      Logout
    </Button>
  </CardSection>
</Card>
</Container>
*/
