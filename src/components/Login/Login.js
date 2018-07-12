/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {
  Container,
  Item,
  Input,
  Form,
  Icon,
  Button,
  Text,
  Title,
  H1
} from 'native-base'
import {
  loginSubmit,
  resetAuthError
} from '../../actions/authAction'

const onSubmit = (action, fields) => {
  console.log('Login ON SUBMIT:', fields)
  action(fields)
}

const navigate = (destination, resetError) => {
  resetError()
  Actions[destination].call()
}

const Login = ({ loginAction, resetError }) => {
  const action = (fields) => onSubmit(loginAction, fields)
  const {
    buttonSubmitStyle,
    textStyleSubmit,
    buttonsContainer,
    titleStyle,
    containerStyle,
    signupAndForgotStyle,
    signupAndForgotTextStyle,
    formStyle
  } = styles

  return (
    <Container
      style={containerStyle}
    >
        <Title
          style={titleStyle}
        >
          LOG IN
        </Title>
        <Form
          onSubmit={action}
          style={formStyle}
        >
          <Item>
            <Icon active name='lock' />
            <Input placeholder='email' />
          </Item>
          <Item>
            <Icon active name='lock' />
            <Input placeholder='password' />
          </Item>
          <Button
            style={buttonSubmitStyle}
            large
            block
            rounded
          >
            <Text
              style={textStyleSubmit}
            >
              submit
            </Text>
          </Button>
        </Form>
        <Container
          style={buttonsContainer}
        >
        <Button
          style={signupAndForgotStyle}
          block
          bordered
          rounded
          onPress={() => navigate('forgotPassword', resetError)}
        >
          <Text
            style={signupAndForgotTextStyle}
          >
            Forgot password?
          </Text>
        </Button>
        <Button
          style={signupAndForgotStyle}
          block
          bordered
          rounded
          onPress={() => navigate('signup', resetError)}
        >
          <Text
            style={signupAndForgotTextStyle}
          >
            Signup
          </Text>
        </Button>
      </Container>

    </Container>
  )
}
const styles = {
  containerStyle: {
    // width: '100%',
    // height: '100%',
    backgroundColor: 'transparent'
  },
  buttonSubmitStyle: {
    marginTop: 25,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 80,
    backgroundColor: 'gray',
  },
  textStyleSubmit: {
    letterSpacing: 3,
  },
  buttonsContainer: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 250
  },
  signupAndForgotStyle: {
    marginBottom: 15,
    borderColor: 'white',
  },
  signupAndForgotTextStyle: {
    color: 'white',
    letterSpacing: 3,
  },
  titleStyle: {
    marginTop: 50,
    height: 50,
    color: 'white'
  },
  formStyle: {
    height: 30
  }
}


const actions = {
  loginAction: loginSubmit,
  resetError: resetAuthError
}
export default connect(null, actions)(Login)
