import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import { Dimensions } from 'react-native'
import { Header, Left, Body, Title, Thumbnail, Right } from 'native-base'

const appIconImage = require('../assets/lets-go-icon.png')

const { width } = Dimensions.get('window')

class HeaderMenu extends Component {
  render() {
    console.log('HeaderMenu:', Actions.currentScene)
    return (
      <Header
        style={{
          height: 62,
          width,
          backgroundColor: 'transparent',
          marginTop: 0,
          marginBottom: 2,
          paddingLeft: 0,
          paddingRight: 0,
          borderBottomColor: '#FFF',
          borderBottomWidth: 2,
          zIndex: 100
        }}
      >
        <Left />
        <Body >
          <Title style={{ marginTop: 18 }}>
            <Thumbnail
              square
              style={{ width: 55, height: 55 }}
              source={appIconImage}
            />
          </Title>
        </Body>
        <Right />
      </Header>
    )
  }
}

export default HeaderMenu
