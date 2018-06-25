/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
import { View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { Button, Card, CardSection } from '../common'
import LoginForm from './LoginForm'
import { loginSubmit } from '../../actions/authAction'

const onSubmit = (action, fields) => {
  console.log('Login ON SUBMIT:', fields)
  action(fields)
}

const Login = ({ loginAction }) => {
  const action = (fields) => onSubmit(loginAction, fields)
  return (
    <View>
      <Card>
        <LoginForm onSubmit={action} />
      </Card>
      <Card>
        <CardSection>
          <Button onPress={Actions.signup}>
            Signup
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={Actions.forgotPassword}>
            Forgot password
          </Button>
        </CardSection>
      </Card>
    </View>
  )
}

const actions = {
  loginAction: loginSubmit
}
export default connect(null, actions)(Login)
