/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { Button, Card, CardSection } from '../common'
import LoginFormGood from './LoginFormGood'
import { loginSubmit, resetAuthError } from '../../actions/authAction'

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
  return (
    <View>
      <Card>
        <LoginFormGood onSubmit={action} />
      </Card>
      <Card>
        <CardSection>
          <Button onPress={() => navigate('signup', resetError)}>
            Signup
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={() => navigate('forgotPassword', resetError)}>
            Forgot password
          </Button>
        </CardSection>
      </Card>
    </View>
  )
}

const actions = {
  loginAction: loginSubmit,
  resetError: resetAuthError
}
export default connect(null, actions)(Login)
