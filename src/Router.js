/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { resetAuthError } from './actions/authAction'
import { leavingCreateActivity } from './actions/actionFeeds'
import {
  LoggedInLandingScene,
  LoggedOutLandingScene
} from './components/LandingScene'
import ActivityFeeds from './components/Events/ActivityFeeds'
import CreateActivity from './components/Events/CreateActivity'
import ForgotPassword from './components/Login/ForgotPassword'
import NewPassword from './components/Login/NewPassword'
import ViewActivity from './components/Events/ViewActivity'
import MyActivities from './components/Events/MyActivities'
import Login from './components/Login/Login'
import Profile from './components/Profile/Profile'
import ProfileEdit from './components/Profile/ProfileEdit'
import Signup from './components/Signup/Signup'
import VerifySignup from './components/Signup/VerifySignup'
import Chat from './components/Messages/Chat'
import Conversations from './components/Messages/Conversations'

const RouterComponent = ({ resetAuthErrorAction, leavingCreateActivityAction }) => {
  return (
    <Router>
      <Scene key='root'>
        <Scene
          key='login'
          hideNavBar='true'
          component={LoggedOutLandingScene}
          LandingComponent={Login}
          onExit={resetAuthErrorAction}
          initial
        />
        <Scene
          key='activityFeeds'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={ActivityFeeds}
        />
        <Scene
          title='Signup'
          key='signup'
          hideNavBar='true'
          component={LoggedOutLandingScene}
          LandingComponent={Signup}
          onExit={resetAuthErrorAction}
        />
        <Scene
          key='verifySignup'
          hideNavBar='true'
          component={LoggedOutLandingScene}
          LandingComponent={VerifySignup}
          onExit={resetAuthErrorAction}
        />
        <Scene
          title='Password Recovery'
          key='forgotPassword'
          hideNavBar='true'
          component={LoggedOutLandingScene}
          LandingComponent={ForgotPassword}
          onExit={resetAuthErrorAction}
        />
        <Scene
          title='New Password'
          key='newPassword'
          hideNavBar='true'
          component={LoggedOutLandingScene}
          LandingComponent={NewPassword}
          onExit={resetAuthErrorAction}
        />
        <Scene
          title='Profile'
          key='profile'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={Profile}
        />
        <Scene
          title='Profile'
          key='profileEdit'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={ProfileEdit}
        />
        <Scene
          title='Chat'
          key='chat'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={Chat}
        />
        <Scene
          title='Conversations'
          key='conversations'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={Conversations}
        />
        <Scene
          key='createActivity'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={CreateActivity}
          onExit={leavingCreateActivityAction}
        />
        <Scene
          key='viewActivity'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={ViewActivity}
        />
        <Scene
          key='myActivities'
          hideNavBar='true'
          component={LoggedInLandingScene}
          LandingComponent={MyActivities}
        />
      </Scene>
    </Router>
  )
}

const actions = {
  resetAuthErrorAction: resetAuthError,
  leavingCreateActivityAction: leavingCreateActivity
}
export default connect(null, actions)(RouterComponent)
