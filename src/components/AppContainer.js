import React, { Component } from 'react'
import { ImageBackground, Dimensions } from 'react-native'
import { Container } from 'native-base'
import HeaderMenu from './HeaderMenu'
import AppContent from './AppContent'

const backgroundImage = require('../assets/1_a_base_02.png')
const { width, height } = Dimensions.get('window');
import { HEADER_HEIGHT, FOOTER_HEIGHT } from './common/Constants'
const contentHeight = height - HEADER_HEIGHT - FOOTER_HEIGHT

class AppContainer extends Component {
  render() {
    return (
      <Container style={{ paddingTop: 20 }}>
        <ImageBackground
          source={backgroundImage}
          style={{ width: '100%', height: '100%' }}
        >
          <HeaderMenu />
          <AppContent style={{ height: contentHeight, width: width }}>
            { this.props.children }
          </AppContent>
        </ImageBackground>
      </Container>
    )
  }
}

export default AppContainer
