/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, ImageBackground, View, TouchableOpacity } from 'react-native'
import { Text, Item } from 'native-base'
import { showImagePicker } from 'react-native-image-picker'

import { CONTENT_WIDTH } from '../common/Constants'
import { getActivityImage, downsizeImage } from '../common/imageUtils'
import { IMAGE_OP_UPDATE, IMAGE_OP_ADD } from '../../actions/imageOp'
import { updateEventImages } from '../../actions/actionFeeds'

const captain = require('../../assets/captain.png')
const editButton = require('../../assets/buttons/editbutton.png')
const darkBackgroundImage = require('../../assets/assets_5.28-06.png')

const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

class OneMoment extends Component {
  state = {
    event: {},
    currentImageUrl: '',
    imageExt: '',
    imageLoading: false,
  }

  getCaptain() {
    const { imageCaptainStyle } = styles
    let source = null
    if (this.props.activity.event_posted_by === this.props.user.id) {
      source = captain
    }
    return (
      <View>
        <Image
          style={imageCaptainStyle}
          source={source}
        />
      </View>
    )
  }

  getEventImage() {
    if (this.hasImages()) {
      return { uri: this.props.activity.images[0].image_url }
    }
    return getActivityImage(this.props.activity.event_category)
  }
  selectImage() {
    // TODO: maybe dispatch action to indicate start loading
    //.setState({ ...this.state, imageLoading: true })
    showImagePicker({}, (response) => {
      console.log('OneMoment.selectImage:', response)
      if (response.didCancel) {
        return
      } else {
        // Profile userpic was modified - added or updated.
        const imageExt = getFileExtension(response.fileName)
        const activity = this.props.activity
        // TODO: We shoudl know which image from the list we editing or adding
        const imageId = activity.images && activity.images.length > 0
            ? activity.images[0].id : null
        downsizeImage(response.uri, imageExt, response.width, response.height)
        .then(([uri, ext]) => {
          const imageRequest = [{
             op: this.hasImages() ? IMAGE_OP_UPDATE : IMAGE_OP_ADD,
             id: imageId,
             image_url: uri,
             image_ext: ext
          }]
          this.props.updateEventImages(
            activity.user_id, activity.event_id, this.props.auth.token, imageRequest)
          // TODO: dispatch action to upload image
          //console.log('OneMoment.downsizeImage', uri, ext)
          //console.log('OneMoment.downsizeImage activity', this.props.activity)
        })
      }
    })
  }

  hasImages() {
    return this.props.activity.images && this.props.activity.images.length > 0
  }

  renderEditIcon(props) {
    const { editIconStyle } = styles
    if (props.user.id !== props.activity.user_id) {
      return (
        <Image
          style={{ ...editIconStyle, opacity: 0 }}
          source={editButton}
        />
      )
    }
    return (
      <Image
        style={editIconStyle}
        source={editButton}
      />
    )
  }

  render() {
    const { event_title } = this.props.activity
    const eventImage = this.getEventImage()
    const onImagePress = () => this.selectImage()

    const {
      containerStyle,
      eventTitleStyle,
      circleImageStyle,
      fullEventImageStyle,
      darkBackgroundStyle,
      infoStyle,
      col1,
      col2,
      col3
    } = styles

    const eventImageStyle = this.hasImages()
      ? fullEventImageStyle
      : circleImageStyle

    return (
      <View style={containerStyle}>
        <Item bordered />
        <Image
          style={eventImageStyle}
          source={eventImage}
        />
        <View>
          <ImageBackground
            source={darkBackgroundImage}
            style={darkBackgroundStyle}
          >
            <View style={infoStyle}>
              <View style={col1}>
                {this.getCaptain()}
              </View>
              <View style={col2}>
                <Text style={eventTitleStyle}>{event_title}</Text>
              </View>
              <View style={col3}>
                <TouchableOpacity onPress={onImagePress}>
                  {this.renderEditIcon(this.props)}
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
        <Item bordered />
      </View>
    )
  }
}

const styles = {
  containerStyle: {
    width: CONTENT_WIDTH,
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginBottom: 30,
    height: 250,
    borderTopWidth: 1,
    borderColor: '#D9D5DC'
  },
  circleImageStyle: {
    marginTop: 50,
    marginBottom: 50,
    height: 100,
    borderRadius: 50,
    width: 100,
    borderColor: 'white',
    borderWidth: 4,
    alignSelf: 'center'
  },
  fullEventImageStyle: {
    resizeMode: 'cover',
    height: 200,
    width: CONTENT_WIDTH,
  },
  imageCaptainStyle: {
    position: 'absolute',
    height: 40,
    width: 40,
  },
  editIconStyle: {
    position: 'absolute',
    height: 40,
    width: 40,
  },
  eventTitleStyle: {
    color: '#fff',
    fontSize: 20
  },
  darkBackgroundStyle: {
    width: CONTENT_WIDTH,
    height: 70,
    paddingTop: 10,
    paddingLeft: 20
  },
  infoStyle: {
    flexDirection: 'row'
  },
  col1: {
    flex: 0.5
  },
  col2: {
    flex: 3
  },
  col3: {
    flex: 0.7
  },
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    auth: state.auth,
  }
}

const actions = {
  updateEventImages
}

export default connect(mapStateToProps, actions)(OneMoment)
