/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { Container } from 'native-base'
import { loginSubmit, resetAuthError } from '../../actions/authAction'
import LoginForm from './LoginForm'
import { LGButton } from '../common'
import { CONTENT_HEIGHT } from '../common/Constants'

const onSubmit = (action, fields) => {
  console.log('Login ON SUBMIT:', fields)
  action(fields)
}

const navigate = (destination, resetError) => {
  resetError()
  Actions[destination].call()
}
const loginTitleImage = require('../../assets/loginTitle.png')

const Login = ({ loginAction, resetError }) => {
  const action = (fields) => onSubmit(loginAction, fields)
  const {
    buttonsContainer,
    titleStyle,
    containerStyle,
    titleContainerStyle
  } = styles

  return (
    <Container style={containerStyle}>
      <Container style={titleContainerStyle}>
        <Image
          source={loginTitleImage}
          style={titleStyle}
        />
      </Container>

      <LoginForm onSubmit={action} />

      <Container style={buttonsContainer}>
        <LGButton
          onPress={() => navigate('forgotPassword', resetError)}
          buttonText="forgot password?"
        />
        <LGButton
          onPress={() => navigate('signup', resetError)}
          buttonText="signup"
        />
      </Container>
    </Container>
  )
}
const styles = {
  containerStyle: {
    backgroundColor: 'transparent',
    height: CONTENT_HEIGHT
  },
  buttonsContainer: {
    backgroundColor: 'transparent',
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 70
  },
  titleStyle: {
    width: null,
    resizeMode: 'contain',
    height: 40,
  },
  titleContainerStyle: {
    marginTop: 80,
    backgroundColor: 'transparent',
  }
}


const actions = {
  loginAction: loginSubmit,
  resetError: resetAuthError
}
export default connect(null, actions)(Login)
