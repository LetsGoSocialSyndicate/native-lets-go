/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { connect } from 'react-redux'
import AppContainer from '../AppContainer'

// TODO: Switch back to activiity feds once all header/footer nagivation done
import ActivityFeeds from '../Events/ActivityFeeds'
// import TempMainScene from '../TempMainScene'
import Login from '../Login/Login'

const LandingScene = (props) => {
  // This is weird, but LandingComponent has to be capitalized!!!
  const { LandingComponent, requiredLoginState, auth, ...rest } = props
  console.log('requiredLoginState', props.name, props.origin, auth.isUserLoggedIn, requiredLoginState)
  if (auth.isUserLoggedIn && !requiredLoginState) {
    return <ActivityFeeds {...rest} />
    // return <TempMainScene {...rest} />
  }
  if (!auth.isUserLoggedIn && requiredLoginState) {
    return <Login {...rest} />
  }
  return <LandingComponent {...rest} />
}

const LandingSceneContainer = (props) => {
  return (
    <AppContainer
      showFooter={props.auth.isUserLoggedIn}
      style={styles.containerStyle}
      showDropdown={props.auth.isUserLoggedIn}
      showBackButton={props.origin}
    >
    {
      // requiredLoginState - this is the desired state of page we asked to go
      // isUserLoggedIn - this is state of app
      // user gets to the page he asked only if
      // his state === required state of the page
      // else --> he is redirected to Login or to Main page
      // if we redirected --> means page we asked has different requested state,
      // that the page we are redirected to
      // that's why we have to use here isUserLoggedIn
    }
      <LandingScene {...props} />
    </AppContainer>
  )
}

const styles = {
  containerStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
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
