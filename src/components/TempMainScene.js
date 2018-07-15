/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { Container } from 'native-base'
import { LGButton } from './common'
import { logout } from '../actions/authAction'

class TempMainScene extends Component {

  render() {
    const {
      containerStyle, buttonsContainer
    } = styles

    return (
      <Container style={containerStyle}>
        <Container style={buttonsContainer}>
          <LGButton
            onPress={() => Actions.activityFeeds()}
            buttonText="feed"
          />
          <LGButton
            onPress={() => Actions.profile({ forOtherUser: false })}
            buttonText="profile"
          />
          <LGButton
            onPress={this.props.logoutAction}
            buttonText="logout"
          />
        </Container>
      </Container>
    )
  }
}

const styles = {
  containerStyle: {
    backgroundColor: 'transparent'
  },
  buttonsContainer: {
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
    marginTop: 100,
    marginBottom: 60,
  }
}

const dispatchToProps = (dispatch) => bindActionCreators({
  logoutAction: logout
}, dispatch)

export default connect(null, dispatchToProps)(TempMainScene)
