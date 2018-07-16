import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import { Header, Left, Body, Item, Thumbnail, Right, Button } from 'native-base'
import {
  HEADER_HEIGHT, CONTENT_WIDTH
} from './common/Constants'
const appIconImage = require('../assets/lets-go-icon.png')

class HeaderMenu extends Component {
  render() {
    return (
      <Header style={styles.headerStyle}>
        <Left />
        <Body >
          <Item style={{ marginTop: 28 }}>
            <Button onPress={() => Actions.login()}>
               <Thumbnail
                square
                style={{ width: 55, height: 55 }}
                source={appIconImage}
               />
            </Button>
          </Item>
        </Body>
        <Right />
      </Header>
    )
  }
}

const styles = {
  headerStyle: {
    height: HEADER_HEIGHT,
    width: CONTENT_WIDTH,
    backgroundColor: 'transparent',
    marginTop: 0,
    marginBottom: 2,
    paddingLeft: 0,
    paddingRight: 0,
    borderBottomColor: '#FFF',
    borderBottomWidth: 2
  }
}

export default HeaderMenu
