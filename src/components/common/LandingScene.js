/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { connect } from 'react-redux'
import AppContainer from '../AppContainer'

// TODO: Switch back to activiity feds once all header/footer nagivation done
// import ActivityFeeds from '../Events/ActivityFeeds'
import TempMainScene from '../TempMainScene'
import Login from '../Login/Login'

const LandingScene = (props) => {
  // This is weird, but LandingComponent has to be capitalized!!!
  const { LandingComponent, requiredLoginState, auth, ...rest } = props
  console.log('requiredLoginState', auth.isUserLoggedIn, requiredLoginState)
  if (auth.isUserLoggedIn && !requiredLoginState) {
    // return <ActivityFeeds {...rest} />
    return <TempMainScene {...rest} />
  }
  if (!auth.isUserLoggedIn && requiredLoginState) {
    return <Login {...rest} />
  }
  return <LandingComponent {...rest} />
}
const LandingSceneContainer = (props) => {
  return (
    <AppContainer
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LandingScene {...props} />
    </AppContainer>
  )
}
const LoggedInLandingSceneFunc = (props) =>
  LandingSceneContainer({ requiredLoginState: true, ...props })

const LoggedOutLandingSceneFunc = (props) =>
  LandingSceneContainer({ requiredLoginState: false, ...props })

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export const LoggedInLandingScene = connect(mapStateToProps)(LoggedInLandingSceneFunc)
export const LoggedOutLandingScene = connect(mapStateToProps)(LoggedOutLandingSceneFunc)
