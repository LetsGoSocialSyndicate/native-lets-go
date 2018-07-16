import React, { Component } from 'react'
import { Button, Thumbnail } from 'native-base'

class IconMenu extends Component {
  render() {
    return (
      <Button>
        <Thumbnail
          style={{ width: 55, height: 55 }}
          source={{ uri: this.props.imageSource }}
        />
      </Button>
    )
  }
}

export { IconMenu }
