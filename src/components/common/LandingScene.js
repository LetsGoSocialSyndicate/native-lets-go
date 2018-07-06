/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { connect } from 'react-redux'

import EventFeeds from '../Events/EventFeeds'
import Login from '../Login/Login'

const LandingScene = (props) => {
  // This is weird, but LandingComponent has to be capitalized!!!
  const { LandingComponent, requiredLoginState, auth, ...rest } = props
  console.log('requiredLoginState', auth.isUserLoggedIn, requiredLoginState)
  if (auth.isUserLoggedIn && !requiredLoginState) {
    return <EventFeeds {...rest} />
  }
  if (!auth.isUserLoggedIn && requiredLoginState) {
    return <Login {...rest} />
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
