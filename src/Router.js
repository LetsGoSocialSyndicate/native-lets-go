/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Actions, Router, Scene } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { resetAuthError } from './actions/authAction'
import {
  LoggedInLandingScene,
  LoggedOutLandingScene
} from './components/common/LandingScene'
import { EventFeeds } from './components/Events/EventFeeds'
import ForgotPassword from './components/Login/ForgotPassword'
import NewPassword from './components/Login/NewPassword'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import VerifySignup from './components/Signup/VerifySignup'

const backButton = (resetError) => {
  resetError()
  Actions.pop()
}

const RouterComponent = ({ resetError }) => {
  return (
    <Router>
      <Scene key='root'>
        <Scene
          key='eventFeeds'
          component={LoggedInLandingScene}
          LandingComponent={EventFeeds}
          title='Feeds'
          initial
        />
        <Scene
          key='login'
          component={LoggedOutLandingScene}
          LandingComponent={Login}
          title='Please Login'
          initial
        />
        <Scene
          key='signup'
          component={LoggedOutLandingScene}
          LandingComponent={Signup}
          title='Signup'
          // Have to override onLeft in order for onBack to work.
          onLeft={() => {}}
           onBack={() => backButton(resetError)}
        />
        <Scene
          key='verifySignup'
          component={LoggedOutLandingScene}
          LandingComponent={VerifySignup}
          title='Verify Signup Code'
          onLeft={() => {}}
          onBack={() => backButton(resetError)}
        />
        <Scene
          key='forgotPassword'
          component={LoggedOutLandingScene}
          LandingComponent={ForgotPassword}
          title='Password Recovery'
          onLeft={() => {}}
          onBack={() => backButton(resetError)}
        />
        <Scene
          key='newPassword'
          component={LoggedOutLandingScene}
          LandingComponent={NewPassword}
          title='New Password'
          onLeft={() => {}}
          onBack={() => backButton(resetError)}
        />
      </Scene>
    </Router>
  )
}

const actions = {
  resetError: resetAuthError
}
export default connect(null, actions)(RouterComponent)
