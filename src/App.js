/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import Router from './Router'
// import AppContainer from './components/AppContainer'


const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

class App extends Component {
  render() {
    return (
      // <AppContainer
      //   style={{
      //     flex: 1,
      //     flexDirection: 'column',
      //     justifyContent: 'center',
      //     alignItems: 'center',
      //   }}
      // >
        <Provider store={store}>
          <Router />
        </Provider>
      // </AppContainer>
    )
  }
}

export default App
