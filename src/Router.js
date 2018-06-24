/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import React from 'react'
import { Scene, Router } from 'react-native-router-flux'

import { EventFeeds } from './components/Events/EventFeeds'


const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene
            key="event-feeds"
            component={EventFeeds}
            title="Please Login"
            initial
        />
      </Scene>
    </Router>
  )
}

export default RouterComponent
