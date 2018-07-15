import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import { Header, Left, Body, Title, Thumbnail, Right, Button } from 'native-base'
import {
  HEADER_HEIGHT, CONTENT_WIDTH
} from './common/Constants'
const appIconImage = require('../assets/lets-go-icon.png')

class HeaderMenu extends Component {
  render() {
    console.log('HeaderMenu:', Actions.currentScene)
    return (
      <Header
        style={{
          height: HEADER_HEIGHT,
          width: CONTENT_WIDTH,
          backgroundColor: 'transparent',
          marginTop: 0,
          marginBottom: 2,
          paddingLeft: 0,
          paddingRight: 0,
          borderBottomColor: '#FFF',
          borderBottomWidth: 2
        }}
      >
        <Left />
        <Body >
          <Title style={{ marginTop: 18 }}>
            <Button onPress={() => Actions.login()}>
              <Thumbnail
                square
                style={{ width: 55, height: 55 }}
                source={appIconImage}
              />
            </Button>
          </Title>
        </Body>
        <Right />
      </Header>
    )
  }
}

export default HeaderMenu
