/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { EventFeeds } from './components/Events/EventFeeds'
import ForgotPassword from './components/Login/ForgotPassword'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import VerifySignup from './components/Signup/VerifySignup'
import { LoggedInLandingScene, LoggedOutLandingScene } from './components/common/LandingScene'

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene
          key="eventFeeds"
          component={LoggedInLandingScene}
          LandingComponent={EventFeeds}
          title="Feeds"
          initial
        />
        <Scene
          key="login"
          component={LoggedOutLandingScene}
          LandingComponent={Login}
          title="Please Login"
        />
        <Scene
          key="signup"
          component={LoggedOutLandingScene}
          LandingComponent={Signup}
          title="Signup"
        />
        <Scene
          key="verifySignup"
          component={VerifySignup}
          title="Verify Signup Code"
        />
        <Scene
          key="forgotPassword"
          component={ForgotPassword}
          title="Password Recovery"
        />
      </Scene>
    </Router>
  )
}

export default RouterComponent
