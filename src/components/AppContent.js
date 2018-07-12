import React, { Component } from 'react'
import { Content } from 'native-base'

class AppContent extends Component {
  render() {
    return (
      <Content
        style={{
          borderColor: '#FFF',
          borderBottomWidth: 1
        }}
      >
        { this.props.children }
      </Content>
    )
  }
}

export default AppContent
