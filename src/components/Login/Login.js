/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Image, Dimensions } from 'react-native'
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
import { LGButton } from '../common'
import { HEADER_HEIGHT, FOOTER_HEIGHT } from '../common/Constants'
const { height } = Dimensions.get('window');
const contentHeight = height - HEADER_HEIGHT - FOOTER_HEIGHT

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
          buttonText="forgot password?" />
        <LGButton
          onPress={() => navigate('signup', resetError)}
          buttonText="signup" />
      </Container>
    </Container>
  )
}
const styles = {
  containerStyle: {
    backgroundColor: 'transparent',
    height: contentHeight
  },
  buttonsContainer: {
    backgroundColor: 'transparent',
    marginLeft: 80,
    marginRight: 80,
    marginTop: 180
  },
  titleStyle: {
    width: null,
    resizeMode: 'contain',
    height: 40,
    // backgroundColor: 'black',
  },
  titleContainerStyle: {
    backgroundColor: 'transparent',
    marginTop: 80,
    marginBottom: 0,
    height: 80
  }
}


const actions = {
  loginAction: loginSubmit,
  resetError: resetAuthError
}
export default connect(null, actions)(Login)
