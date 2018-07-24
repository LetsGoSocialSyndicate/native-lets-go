/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, TouchableOpacity } from 'react-native'
import { Text, Item } from 'native-base'
import { showImagePicker } from 'react-native-image-picker'

import { CONTENT_WIDTH } from '../common/Constants'
import { getActivityImage, downsizeImage } from '../common/imageUtils'
import { IMAGE_OP_UPDATE, IMAGE_OP_ADD } from '../../actions/imageOp'

const captain = require('../../assets/captain.png')
const editButton = require('../../assets/buttons/editbutton.png')

const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

class OneMoment extends Component {
  getCaptain() {
    const { imageCaptainStyle } = styles
    let source = null
    console.log('this.props.activity.posted_by', this.props.activity.event_posted_by)
    console.log('this.props.user.id', this.props.user.id)

    if (this.props.activity.event_posted_by === this.props.user.id) {
      source = captain
    }
    console.log('source', source)

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
        const op = this.hasImages() ? IMAGE_OP_UPDATE : IMAGE_OP_ADD
        const imageExt = getFileExtension(response.fileName)
        downsizeImage(response.uri, imageExt, response.width, response.height)
        .then(([uri, ext]) => {
          // TODO: dispatch action to upload image
          console.log('OneMoment.downsizeImage', uri, ext)
          // this.setState({
          //   ...this.state,
          //   imageLoading: false,
          //   // currentImageUrl: `data:image/${ext};base64,${response.data}`,
          //   currentImageUrl: uri,
          //   imageExt: ext,
          //   profileImageOp: op,
          // })
        })
      }
    })
  }

  render() {
  const { event_title, event_category } = this.props.activity
  const eventImage = getActivityImage(event_category)
  const onImagePress = () => this.selectImage()

  const {
    containerStyle,
    eventSectionStyle,
    organizerSectionStyle,
    eventTitleStyle,
    eventImageStyle,
    editIconStyle
  } = styles

  return (
      <View style={containerStyle}>
        <View style={organizerSectionStyle}>
          {/* <TouchableOpacity>
            <Image style={profileImageStyle} source={{ uri: user_image_url }} />
          </TouchableOpacity> */}
        </View>
        <View style={eventSectionStyle}>
          <Text style={eventTitleStyle}>{event_title}</Text>
          <Image style={eventImageStyle} source={eventImage} />

          <TouchableOpacity onPress={onImagePress}>
            <Image
              style={editIconStyle}
              source={editButton}
            />
          </TouchableOpacity>


          {this.getCaptain()}

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
  },
  organizerSectionStyle: {
    flexDirection: 'row'
  },
  eventSectionStyle: {
    marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventInfoStyle: {
    marginTop: 20,
    marginLeft: 10,
    flexDirection: 'column'
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
    //zIndex: 100,
    //position: 'absolute',
    height: 30,
    width: 30
  },
  editIconStyle: {
    height: 30,
    width: 30
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(OneMoment)
