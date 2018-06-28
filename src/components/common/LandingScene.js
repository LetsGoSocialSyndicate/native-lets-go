/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

const LandingScene = (props) => {
  // This is weird, but LandingComponent has to be capitalized!!!
  const { LandingComponent, requiredLoginState, auth, ...rest } = props
  console.log('requiredLoginState', auth.isUserLoggedIn, requiredLoginState)
  if (auth.isUserLoggedIn && !requiredLoginState) {
    Actions.eventFeeds({ type: 'reset' })
    return null
  }
  if (!auth.isUserLoggedIn && requiredLoginState) {
    Actions.login({ type: 'reset' })
    return null
  }
  return <LandingComponent {...rest} />
}

const LoggedInLandingSceneFunc = (props) =>
  LandingScene({ requiredLoginState: true, ...props })

const LoggedOutLandingSceneFunc = (props) =>
  LandingScene({ requiredLoginState: false, ...props })

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export const LoggedInLandingScene = connect(mapStateToProps)(LoggedInLandingSceneFunc)
export const LoggedOutLandingScene = connect(mapStateToProps)(LoggedOutLandingSceneFunc)
