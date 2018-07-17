import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux';
import { ActionSheetIOS, TouchableOpacity, Image } from 'react-native'
import { Header, Left, Body, Item, Thumbnail, Right, Button, Text, Icon, ActionSheet } from 'native-base'
import {
  HEADER_HEIGHT, CONTENT_WIDTH
} from './common/Constants'
const appIconImage = require('../assets/lets-go-icon.png')
const menuIconImage = require('../assets/menus/three-dot.png')

class HeaderMenu extends Component {
  renderMenu() {
    const { buttonStyle, thumbnailStyle } = styles
    if (this.props.showMenu) {
      return (
        <TouchableOpacity onPress={ this.onMenuPress }>
          <Image
           source={ menuIconImage }
           style={ thumbnailStyle }
         />
        </TouchableOpacity>
      )
    }
  }
  onMenuPress = (e, i) => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['cancel', 'logout'],
      // destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        Actions.logout()
      }
    });
  }

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
        <Right>
          { this.renderMenu() }
        </Right>
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
  },
  thumbnailStyle: {
    width: 40,
    height: 8,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 10
  }
}

export default HeaderMenu
