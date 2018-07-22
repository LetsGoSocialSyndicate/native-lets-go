import React, { Component } from 'react'
import { ImageBackground, View } from 'react-native'
import ChatDeamon from './Messages/ChatDeamon'
import HeaderMenu from './HeaderMenu'
import FooterMenu from './FooterMenu'
import AppContent from './AppContent'
import { CONTENT_WIDTH, CONTAINER_HEIGHT } from './common/Constants'

const backgroundImage = require('../assets/1_a_base_02.png')

class AppContainer extends Component {
  render() {
    return (
      <View style={{ paddingTop: 20 }}>
        <ImageBackground
          source={backgroundImage}
          style={{ width: CONTENT_WIDTH, height: CONTAINER_HEIGHT }}
        >
          <HeaderMenu
            showMenu={this.props.showDropdown}
            showBackButton={this.props.showBackButton}
          />
          <AppContent style={{ width: CONTENT_WIDTH }}>
            { this.props.children }
          </AppContent>
          { this.props.showFooter ? <FooterMenu /> : null }
          <ChatDeamon />
        </ImageBackground>
      </View>
    )
  }
}

export default AppContainer
