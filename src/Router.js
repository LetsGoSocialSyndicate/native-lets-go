/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { ScrollView  } from 'react-native'
import { Router, Scene, Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { EventFeeds } from './components/Events/EventFeeds'
import ForgotPassword from './components/Login/ForgotPassword'
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import VerifySignup from './components/Signup/VerifySignup'
import { LoggedInLandingScene, LoggedOutLandingScene } from './components/common/LandingScene'
import { resetAuthError } from './actions/authAction'

const FormModal = (props) => {
    return (
      <ScrollView>
        { props.renderScene() }
      </ScrollView>
    )
}

const backButton = (resetError) => {
  resetError()
  Actions.pop()
}

const RouterComponent = ({ resetError }) => {
  return (
    <Router>
      <Scene key="root">
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
          initial
        />
        <Scene
          key="signup"
          component={LoggedOutLandingScene}
          LandingComponent={Signup}
          title="Signup"
          // Have to override onLeft in order for onBack to work.
          onLeft={() => {}}
          onBack={() => backButton(resetError)}
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
        <Scene
          key='formModal'
          component={FormModal}
          direction='vertical'
          rightTitle='Save'
        />
      </Scene>
    </Router>
  )
}

const actions = {
  resetError: resetAuthError
}
export default connect(null, actions)(RouterComponent)
