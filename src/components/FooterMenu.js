import React, { Component } from 'react'
import { Footer, FooterTab } from 'native-base'
import IconMenu from './common/IconMenu'

class FooterMenu extends Component {
  render() {
    return (
      <Footer style={{ height: 70, backgroundColor: 'transparent' }}>
        <FooterTab>
          <IconMenu imageSource='https://res.cloudinary.com/drf6ttx34/image/upload/v1530996064/App%20Icons/Home_Icon.png' />
          <IconMenu imageSource='https://res.cloudinary.com/drf6ttx34/image/upload/v1530996065/App%20Icons/Add_Event_Icon.png' />
          <IconMenu imageSource='https://res.cloudinary.com/drf6ttx34/image/upload/v1530996063/App%20Icons/My_Events_Icon.png' />
          <IconMenu imageSource='https://res.cloudinary.com/drf6ttx34/image/upload/v1530996065/App%20Icons/My_Messages_Icon.png' />
          <IconMenu imageSource='https://res.cloudinary.com/drf6ttx34/image/upload/v1530996065/App%20Icons/My_Profile_Icon.png' />
        </FooterTab>
      </Footer>
    )
  }
}

export default FooterMenu
