/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Container, Card, Item } from 'native-base'
import { LGButton } from '../common'
import ActivityFeed from './ActivityFeed'
import { fetchEventFeeds } from '../../actions/actionFeeds'
import { logout } from '../../actions/authAction'

class ActivityFeeds extends Component {
  componentDidMount(){
    this.props.fetchEventFeeds(this.props.token)
  }

  renderActivity(activity) {
    return (
      <Item>
        <ActivityFeed activity={ activity }></ActivityFeed>
      </Item>
    )
  }

  renderActivityFeeds() {
    return (
      Object.values(this.props.eventFeeds)
        .map((event) => {
          return this.renderActivity(event)
        })
    )
  }

  render() {
    const {
      containerStyle, buttonsContainer
    } = styles

    return (
      <Container style={ containerStyle }>
        <Container style={ buttonsContainer }>
          <LGButton
            onPress={() => Actions.profile({ forOtherUser: false })}
            buttonText="profile" />
          <LGButton
            onPress={ this.props.logoutAction }
            buttonText="logout"/>
        </Container>
        <Card>
          { this.renderActivityFeeds() }
          <Item>
          </Item>
        </Card>
      </Container>
    )
  }
}

const styles = {
  containerStyle: {
    backgroundColor: 'transparent'
  },
  buttonsContainer: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 50
  },
  titleStyle: {
    width: null,
    resizeMode: 'contain',
    height: 40
  },
  titleContainerStyle: {
    marginTop: 100,
    marginBottom: 60,
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
