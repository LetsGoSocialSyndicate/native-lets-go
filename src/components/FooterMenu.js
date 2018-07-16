import React, { Component } from 'react'
import { Footer, FooterTab } from 'native-base'
import { IconMenu } from './common'
import { FOOTER_HEIGHT, CONTENT_WIDTH } from './common/Constants'

const homeImage = require('../assets/menus/Home_Icon.png')
const addEventImage = require('../assets/menus/Add_Event_Icon.png')
const myEventsImage = require('../assets/menus/My_Events_Icon.png')
const myMessagesImage = require('../assets/menus/My_Messages_Icon.png')
const myProfileImage = require('../assets/menus/My_Profile_Icon.png')

class FooterMenu extends Component {
  render() {
    const { footerStyle } = styles
    return (
      <Footer style={ footerStyle }>
        <FooterTab>
          <IconMenu source={ homeImage } />
          <IconMenu source={ addEventImage } />
          <IconMenu source={ myEventsImage } />
          <IconMenu source={ myMessagesImage } />
          <IconMenu source={ myProfileImage } />
        </FooterTab>
      </Footer>
    )
  }
}

const styles = {
  footerStyle: {
    height: FOOTER_HEIGHT,
    width: CONTENT_WIDTH,
    backgroundColor: 'transparent'
  }
}
export default FooterMenu
