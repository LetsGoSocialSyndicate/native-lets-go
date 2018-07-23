import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Footer, FooterTab } from 'native-base'
import { IconMenu } from './common'
import { FOOTER_HEIGHT, CONTENT_WIDTH } from './common/Constants'

const homeImage = require('../assets/menus/Home_Icon.png')
const addEventImage = require('../assets/menus/Add_Event_Icon.png')
const myEventsImage = require('../assets/menus/My_Events_Icon.png')
const myMessagesImage = require('../assets/menus/My_Messages_Icon.png')
const UnreadMessagesImage = require('../assets/menus/Unread_Messages_Icon.png')
const myProfileImage = require('../assets/menus/My_Profile_Icon.png')


class FooterMenu extends Component {
  render() {
    const { currentScene } = Actions
    const { footerStyle } = styles
    const messagesImage = this.props.chat.hasUnread ?
      UnreadMessagesImage : myMessagesImage
    return (
      <Footer style={footerStyle}>
        <FooterTab >
          <IconMenu source={homeImage} active={currentScene === 'login'} onPress={() => Actions.login()} />
          <IconMenu source={myEventsImage} active={currentScene === 'myActivities'} onPress={() => Actions.myActivities()} />
          <IconMenu source={addEventImage} active={currentScene === 'createActivity'} onPress={() => Actions.createActivity()} />
          <IconMenu
            source={messagesImage}
            active={currentScene === 'conversations'}
            special={this.props.chat.hasUnread}
            onPress={() => Actions.conversations()}
          />
          <IconMenu source={myProfileImage} active={currentScene === 'profile'} onPress={() => Actions.profile()} />
        </FooterTab>
      </Footer>
    )
  }
}

const styles = {
  footerStyle: {
    height: FOOTER_HEIGHT,
    width: CONTENT_WIDTH,
    backgroundColor: 'transparent',
    // marginTop: 0,
    // paddingTop: 0,
    // paddingBottom: 0
  }
}

const mapStateToProps = (state) => {
  return { chat: state.chat }
}
export default connect(mapStateToProps)(FooterMenu)
