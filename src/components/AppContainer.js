import React, { Component } from 'react'
import { ImageBackground } from 'react-native'
import { Container } from 'native-base'
import HeaderMenu from './HeaderMenu'
import AppContent from './AppContent'

const backgroundImage = require('../assets/1_a_base_02.png')

class AppContainer extends Component {
  render() {
    return (
      <Container style={{ paddingTop: 20 }}>
        <ImageBackground
          source={backgroundImage}
          style={{ width: '100%', height: '100%' }}
        >
          <HeaderMenu />
          <AppContent>
            { this.props.children }
          </AppContent>
        </ImageBackground>
      </Container>
    )
  }
}

export default AppContainer
