import React, { Component } from 'react'
import { ImageBackground } from 'react-native'
import { Container } from 'native-base'
import HeaderMenu from './HeaderMenu'
import FooterMenu from './FooterMenu'
import AppContent from './AppContent'

const backgroundImage = require('../assets/1_a_base_02.png')
import {
  HEADER_HEIGHT, FOOTER_HEIGHT,
  CONTENT_WIDTH, CONTENT_HEIGHT, CONTAINER_HEIGHT
} from './common/Constants'

class AppContainer extends Component {
  render() {
    return (
      <Container style={{ paddingTop: 20 }}>
        <ImageBackground
          source={backgroundImage}
          style={{ width: CONTENT_WIDTH, height: CONTAINER_HEIGHT }}
        >
          <HeaderMenu showMenu={ this.props.showDropdown }/>
          <AppContent style={{ height: CONTENT_HEIGHT, width: CONTENT_WIDTH }}>
            { this.props.children }
          </AppContent>
          { this.props.showFooter ? <FooterMenu /> : null }
        </ImageBackground>
      </Container>
    )
  }
}

export default AppContainer
