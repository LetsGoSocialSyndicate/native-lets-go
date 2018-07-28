/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, ImageBackground, View } from 'react-native'
import { Text, Item } from 'native-base'
import { showImagePicker } from 'react-native-image-picker'

import { CONTENT_WIDTH } from '../common/Constants'
import { getActivityImage, downsizeImage, getFileExtension } from '../common/imageUtils'
import LoadingButton from '../common/LoadingButton'
import { IMAGE_OP_UPDATE, IMAGE_OP_ADD } from '../../actions/imageOp'
import { updateEventImages } from '../../actions/actionFeeds'

const captain = require('../../assets/captain.png')
const editButton = require('../../assets/buttons/editbutton.png')
const darkBackgroundImage = require('../../assets/assets_5.28-06.png')

class OneMoment extends Component {
  state = {
    imageLoading: false,
  }

  getCaptain() {
    const source = this.props.activity.event_posted_by === this.props.user.id
      ? captain : null
    return (
      <View>
        <Image
          style={styles.imageCaptainStyle}
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
    this.setState({ ...this.state, imageLoading: true })
    showImagePicker({}, (response) => {
      console.log('OneMoment.selectImage:', response)
      if (response.didCancel) {
        this.setState({ ...this.state, imageLoading: false })
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
            activity.user_id,
            activity.event_id,
            this.props.auth.token,
            imageRequest
          ).then(() =>
            this.setState({ ...this.state, imageLoading: false })
          )
        })
      }
    })
  }

  hasImages() {
    return this.props.activity.images && this.props.activity.images.length > 0
  }

  renderEditButton() {
    if (this.props.user.id !== this.props.activity.user_id) {
      return null
    }
    return (
      <LoadingButton
        loading={this.state.imageLoading}
        onPress={() => this.selectImage()}
        source={editButton}
        imageStyle={styles.editIconStyle}
        spinnerStyle={styles.editIconStyle}
      />
    )
  }

  render() {
    const eventTitle = this.props.activity.event_title
    const eventImage = this.getEventImage()
    const eventImageStyle = this.hasImages()
      ? styles.fullEventImageStyle
      : styles.circleImageStyle

    return (
      <View style={styles.containerStyle}>
        <Item bordered />
        <Image style={eventImageStyle} source={eventImage} />
        <View>
          <ImageBackground
            source={darkBackgroundImage}
            style={styles.darkBackgroundStyle}
          >
            <View style={styles.infoStyle}>
              <View style={styles.col1}>
                {this.getCaptain()}
              </View>
              <View style={styles.col2}>
                <Text style={styles.eventTitleStyle}>{eventTitle}</Text>
              </View>
              <View style={styles.col3}>
                {this.renderEditButton()}
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
