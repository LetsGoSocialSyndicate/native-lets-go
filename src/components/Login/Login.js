/* Copyright 2018, Socializing Syndicate Corp. */
import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Image, ScrollView } from 'react-native'
import { Container, Spinner } from 'native-base'
import { loginSubmit, autoLogin } from '../../actions/authAction'
import LoginForm from './LoginForm'
import { LGButton } from '../common'
import { CONTENT_HEIGHT } from '../common/Constants'

const onSubmit = (action, fields) => {
  console.log('Login ON SUBMIT:', fields)
  action(fields)
}

const loginTitleImage = require('../../assets/loginIcons/loginTitle.png')

class Login extends Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    if (this.props.auth.loading) {
      return (
        <Container>
          <Spinner color='red' />
        </Container>
      )
    }

    const action = (fields) => onSubmit(this.props.loginSubmit, fields)

    return (
      <ScrollView style={styles.outterContainerStyle}>
        <Container style={styles.titleContainerStyle}>
          <Image
            source={loginTitleImage}
            style={styles.titleStyle}
          />
        </Container>

        <LoginForm onSubmit={action} />

        <Container style={styles.buttonsContainer}>
          <LGButton
            onPress={() => {
              Actions.forgotPassword({ origin: 'Login' })
            }}
            buttonText="forgot password?"
          />
          <LGButton
            onPress={() => {
              Actions.signup({ origin: 'Login' })
            }}
            buttonText="signup"
          />
        </Container>
      </ScrollView>
    )
  }
}

const styles = {
  outterContainerStyle: {
    backgroundColor: 'transparent',
    height: CONTENT_HEIGHT,
  },
  titleContainerStyle: {
    marginTop: 80,
    marginBottom: -620,
    backgroundColor: 'transparent',
  },
  titleStyle: {
    width: null,
    resizeMode: 'contain',
    height: 40,
  },
  buttonsContainer: {
    backgroundColor: 'transparent',
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 70,
    marginTop: 60
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}
const actions = {
  autoLogin, loginSubmit
}
export default connect(mapStateToProps, actions)(Login)
