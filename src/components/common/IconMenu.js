import React, { Component } from 'react'
import { Button, Thumbnail } from 'native-base'


class IconMenu extends Component {
  renderThumbnailStyle(props) {
    const { thumbnailStyle } = styles
    if (props.active) {
      return (
        <Thumbnail
          style={{ ...thumbnailStyle, opacity: 1.0 }}
          source={props.source}
        />
      )
    } return (
      <Thumbnail
        style={thumbnailStyle}
        source={this.props.source}
      />
    )
  }

  render() {
    const { buttonStyle } = styles
    return (
      <Button style={buttonStyle} onPress={this.props.onPress}>
        {this.renderThumbnailStyle(this.props)}
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
    marginBottom: 0,
    opacity: 0.4
  }
}

export { IconMenu }
