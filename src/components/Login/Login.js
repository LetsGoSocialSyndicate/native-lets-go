/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import {
  Container,
  Button,
  Text
} from 'native-base'
import {
  loginSubmit,
  resetAuthError
} from '../../actions/authAction'
import LoginForm from './LoginForm'

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
    signupAndForgotStyle,
    signupAndForgotTextStyle,
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
        <Button
          style={signupAndForgotStyle}
          block
          bordered
          rounded
          onPress={() => navigate('forgotPassword', resetError)}
        >
          <Text style={signupAndForgotTextStyle}>
            forgot password?
          </Text>
        </Button>
        <Button
          style={signupAndForgotStyle}
          block
          bordered
          rounded
          onPress={() => navigate('signup', resetError)}
        >
          <Text style={signupAndForgotTextStyle}>
            signup
          </Text>
        </Button>
      </Container>
    </Container>
  )
}
const styles = {
  containerStyle: {
    backgroundColor: 'transparent'
  },
  buttonsContainer: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 200
  },
  signupAndForgotStyle: {
    marginBottom: 15,
    borderColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
  },
  signupAndForgotTextStyle: {
    color: 'white',
    letterSpacing: 2,
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


const actions = {
  loginAction: loginSubmit,
  resetError: resetAuthError
}
export default connect(null, actions)(Login)
