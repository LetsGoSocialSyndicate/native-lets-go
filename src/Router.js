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
import EventFeeds from './components/Events/EventFeeds'
import ForgotPassword from './components/Login/ForgotPassword'
import NewPassword from './components/Login/NewPassword'
// import LoginGood from './components/Login/LoginGood'
// import SignupGood from './components/Login/SignupGood'

import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
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
          key='login'
          hideNavBar='true'
          component={LoggedOutLandingScene}
          LandingComponent={Login}
          // title='Please Login'
          initial
        />
        <Scene
          key='eventFeeds'
          component={LoggedInLandingScene}
          LandingComponent={EventFeeds}
          title='Feeds'
        />
        <Scene
          key='signup'
          hideNavBar='true'
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
        <Scene
          key='profile'
          component={LoggedInLandingScene}
          LandingComponent={Profile}
          title='Profile'
        />
      </Scene>
    </Router>
  )
}

const actions = {
  resetError: resetAuthError
}
export default connect(null, actions)(RouterComponent)
