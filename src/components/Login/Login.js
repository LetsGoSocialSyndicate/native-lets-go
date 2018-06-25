/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
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
      <LoginForm onSubmit={action} />
      <Card>
        <CardSection
          // style={{
          //   flex: 1,
            // flexDirection: 'column',
            // justifyContent: 'space-between'
          // }}
        >

        <Button
          onPress={Actions.signup}
          // style={{ height: 50, backgroundColor: 'powderblue' }}
        >
          Signup
        </Button>

        <Button
          onPress={Actions.forgotPassword}
          // style={{ height: 50, backgroundColor: 'steelblue' }}
        >
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
