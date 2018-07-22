import React, { Component } from 'react'
import { Button, Thumbnail } from 'native-base'

class IconMenu extends Component {
  render() {
    let { buttonStyle, thumbnailStyle } = styles
    if (this.props.special) {
      thumbnailStyle = {
        ...thumbnailStyle,
        borderColor: 'black',
        borderWidth: 2
      }
    }
    return (
      <Button style={buttonStyle} onPress={this.props.onPress}>
        <Thumbnail
          style={thumbnailStyle}
          source={this.props.source}
        />
      </Button>
    )
  }
}

const styles = {
  buttonStyle: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0
  },
  thumbnailStyle: {
    width: 55,
    height: 55,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginTop: 0,
    marginBottom: 0
  }
}

export { IconMenu }
