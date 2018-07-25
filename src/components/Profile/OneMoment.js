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

// const getEventImage = (event) => {
//   return event && 'images' in event && event.images.length > 0
//     ? event.images[0].image_url
//     : getActivityImage(event_category)
// }
//
// const getEventImageId = (event) => {
//   return event && 'images' in event && event.images.length > 0
//     ? event.images[0].id
//     : null
// }

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

  hasImages() {
    return this.props.activity.images && this.props.activity.images.length > 0
  }

  // buildImageRequest() {
  //   // For now returning array of 1 - we allow only 1 profile userpic
  //   console.log('building request....')
  //   return [{
  //      op: this.state.profileImageOp,
  //      // id: getUserpicId(this.state.user),
  //      id: getEventImageId(this.state.activity),
  //      image_url: this.state.currentImageUrl,
  //      image_ext: this.state.imageExt
  //   }]
  // }

  selectImage() {
    // TODO: maybe dispatch action to indicate start loading
    //.setState({ ...this.state, imageLoading: true })
    showImagePicker({}, (response) => {
      console.log('OneMoment.selectImage:', response)
      if (response.didCancel) {
        return
        // this.setState({
        //   ...this.state,
        //   imageLoading: false
        // })
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
          console.log('OneMoment.downsizeImage', uri, ext)
          console.log('OneMoment.downsizeImage activity', this.props.activity)
        })
      }
    })
  }

  renderEditImage(props) {
    console.log('renderEditImage props', props)
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

  getEventImage() {
    const { event_category, images } = this.props.activity
    console.log('OneMoment.images', images)
    if (images && images.length > 0) {
      return { uri: images[0].image_url }
    } else {
      return getActivityImage(event_category)
    }
  }
  render() {
  console.log('OneMoment.render', this.props.activity)
  const { event_title } = this.props.activity
  const eventImage = this.getEventImage()
  const onImagePress = () => this.selectImage()

  const {
    containerStyle,
    eventSectionStyle,
    eventTitleStyle,
    eventImageStyle,
    editIconStyle
  } = styles

  return (
      <View style={containerStyle}>
        <Item bordered />

        <View style={eventSectionStyle}>

          <Image style={eventImageStyle} source={eventImage} />


          <TouchableOpacity onPress={onImagePress}>
            {this.renderEditImage(this.props)}
          </TouchableOpacity>

          {this.getCaptain()}
          <ImageBackground
            source={darkBackgroundImage}
            style={{ width: CONTENT_WIDTH, height: 70  }}
          >
            <Text style={eventTitleStyle}>{event_title}</Text>
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
    backgroundColor: 'transparent',
    marginBottom: 8
  },
  eventSectionStyle: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  eventImageStyle: {
    marginTop: 10,
    marginLeft: 10,
    height: 100,
    borderRadius: 50,
    width: 100,
    borderColor: 'white',
    borderWidth: 4
  },
  imageCaptainStyle: {
    height: 30,
    width: 30,
    position: 'relative',
    left: 160,
    bottom: 135
  },
  editIconStyle: {
    height: 30,
    width: 30,
    position: 'relative',
    left: 160,
    top: 15
  },
  eventTitleStyle: {
    color: '#fff',
    paddingLeft: 20,
    fontSize: 20
  }
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
