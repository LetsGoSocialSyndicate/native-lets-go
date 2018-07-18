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
import ActivityFeeds from './components/Events/ActivityFeeds'
import CreateActivity from './components/Events/CreateActivity'
import ForgotPassword from './components/Login/ForgotPassword'
import NewPassword from './components/Login/NewPassword'
import ViewActivity from './components/Events/ViewActivity'
// import LoginGood from './components/Login/LoginGood'
// import SignupGood from './components/Login/SignupGood'

import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import ProfileEdit from './components/Profile/ProfileEdit'
import Signup from './components/Signup/Signup'
import VerifySignup from './components/Signup/VerifySignup'
// import TempMainScene from './components/TempMainScene'
import Chat from './components/Messages/Chat'

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
          initial
        />
        {/* <Scene
          key='tempMainScene'
          component={LoggedInLandingScene}
          LandingComponent={TempMainScene}
          hideNavBar='true'
          title='Temp Main Scene'
        /> */}
        <Scene
          key='activityFeeds'
          component={LoggedInLandingScene}
          LandingComponent={ActivityFeeds}
          hideNavBar='true'
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
          hideNavBar='true'
          component={LoggedOutLandingScene}
          LandingComponent={VerifySignup}
          onLeft={() => {}}
          onBack={() => backButton(resetError)}
        />
        <Scene
          key='forgotPassword'
          hideNavBar='true'
          component={LoggedOutLandingScene}
          LandingComponent={ForgotPassword}
          title='Password Recovery'
          onLeft={() => {}}
          onBack={() => backButton(resetError)}
        />
        <Scene
          key='newPassword'
          hideNavBar='true'
          component={LoggedOutLandingScene}
          LandingComponent={NewPassword}
          title='New Password'
          onLeft={() => {}}
          onBack={() => backButton(resetError)}
        />
        <Scene
          key='profile'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={Profile}
          title='Profile'
        />
        <Scene
          key='profileEdit'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={ProfileEdit}
          title='Profile'
        />
        <Scene
          key='chat'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={Chat}
          title='Chat'
        />
        <Scene
          key='createActivity'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={CreateActivity}
        />
        <Scene
          key='viewActivity'
          component={LoggedInLandingScene}
          LandingComponent={ViewActivity}
          hideNavBar='true'
        />
      </Scene>
    </Router>
  )
}

const actions = {
  resetError: resetAuthError
}
export default connect(null, actions)(RouterComponent)
