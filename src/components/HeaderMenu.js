/* Copyright 2018, Socializing Syndicate Corp. */
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Actions } from 'react-native-router-flux'
import { ActionSheetIOS, TouchableOpacity, Image } from 'react-native'
import { Header, Left, Body, Item, Thumbnail, Right, Button } from 'native-base'
import { logout } from '../actions/authAction'
import { HEADER_HEIGHT, CONTENT_WIDTH } from './common/Constants'

const appIconImage = require('../assets/lets-go-icon.png')
const menuIconImage = require('../assets/menus/three-dot.png')
const backIconImage = require('../assets/menus/back.png')

class HeaderMenu extends Component {
  onMenuPress = () => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['cancel', 'logout'],
      // destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    },
    (buttonIndex) => {
      if (buttonIndex === 1) {
        this.props.logoutAction()
      }
    })
  }
  onBackPress = () => {
    // In order to force refresh, we need to provide refresh state
    // different than previous. Using current millis as unique value
    // does the work.
    Actions.pop({ refresh: { test: moment().valueOf() } })
  }
  renderBackMenu() {
    const { backMenuStyle } = styles
    if (this.props.showBackButton) {
      return (
        <TouchableOpacity onPress={this.onBackPress}>
          <Image source={backIconImage} style={backMenuStyle} />
        </TouchableOpacity>
      )
    }
  }
  renderDropdownMenu() {
    const { dropdownMenuStyle } = styles
    if (this.props.showMenu) {
      return (
        <TouchableOpacity onPress={this.onMenuPress}>
          <Image source={menuIconImage} style={dropdownMenuStyle} />
        </TouchableOpacity>
      )
    }
  }


  render() {
    return (
      <Header style={styles.headerStyle}>
        <Left>
          { this.renderBackMenu() }
        </Left>
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
          { this.renderDropdownMenu() }
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
  dropdownMenuStyle: {
    width: 40,
    height: 8,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 10
  },
  backMenuStyle: {
    width: 40,
    height: 30,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 15
  }
}

const dispatchToProps = (dispatch) => bindActionCreators({
  logoutAction: logout
}, dispatch)

export default connect(null, dispatchToProps)(HeaderMenu)
