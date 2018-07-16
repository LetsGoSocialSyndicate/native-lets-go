import React, { Component } from 'react'
import { Button, Thumbnail } from 'native-base'

class IconMenu extends Component {
  render() {
    const { buttonStyle, thumbnailStyle } = styles
    return (
      <Button style={ buttonStyle }>
        <Thumbnail
          style={ thumbnailStyle }
          source={ this.props.source }
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
