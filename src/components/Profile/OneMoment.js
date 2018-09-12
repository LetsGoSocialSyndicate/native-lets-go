/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FlatList, Image, ImageBackground, View } from 'react-native'
import { Text, Item } from 'native-base'
import { showImagePicker } from 'react-native-image-picker'

import { updateEventImages } from '../../actions/actionFeeds'
import { IMAGE_OP_UPDATE, IMAGE_OP_ADD } from '../../actions/imageOp'
import { formatCoarseEventDate } from '../common/ActivityUtils'
import { CONTENT_WIDTH } from '../common/Constants'
import { getActivityImage, downsizeImage, getFileExtension } from '../common/ImageUtils'
import LoadingButton from '../common/LoadingButton'

const captain = require('../../assets/oneActivity/captained.png')
const editButton = require('../../assets/buttons/editbutton.png')
const darkBackgroundImage = require('../../assets/assets_5.28-06.png')

// This has to be defined once in order to be used in onViewableItemsChanged()
// 80 - means the image has to be at least 80% visible on the screen in order to
// be included in viewableItems.
const viewabilityConfig = { itemVisiblePercentThreshold: 80 }

class OneMoment extends Component {
  state = {
    imageLoading: false,
    imageIndex: -1,  // i.e. start with invalid index
  }

  onViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length === 1) {
      this.setState({ ...this.state, imageIndex: viewableItems[0].index })
    } else {
      this.setState({ ...this.state, imageIndex: -1 })
    }
  }

  getCaptain = () => {
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

  isReadOnly = () => {
    return this.props.user.id !== this.props.activity.user_id
  }

  selectImage = () => {
    if (this.state.imageIndex === -1) {
      return
    }
    this.setState({ ...this.state, imageLoading: true })
    showImagePicker({}, (response) => {
      console.log('OneMoment.selectImage:', response)
      if (response.didCancel) {
        this.setState({ ...this.state, imageLoading: false })
      } else {
        // Profile userpic was modified - added or updated.
        const imageExt = getFileExtension(response.fileName)
        const activity = this.props.activity
        const images = activity.images || []
        // For now last image is always placeholder.
        const op = this.state.imageIndex < images.length
          ? IMAGE_OP_UPDATE : IMAGE_OP_ADD
        const imageId = this.state.imageIndex < images.length
          ? activity.images[this.state.imageIndex].id : null
        downsizeImage(response.uri, imageExt, response.width, response.height)
        .then(([uri, ext]) => {
          const imageRequest = [{
             op,
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

  renderEditButton = () => {
    if (this.isReadOnly()) {
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

  renderItem = ({ item }) => {
    return (
       <View style={styles.containerStyle}>
         <Image style={item.style} source={item.source} />
       </View>
     )
  }

  render() {
    console.log('OneMoment.render:', this.props.activity)
    const eventTitle = this.props.activity.event_title
    const eventDate = formatCoarseEventDate(this.props.activity.event_start_time)
    const images = this.props.activity.images || []
    const imageItems = images.map(image => {
      return {
        source: { uri: image.image_url },
        style: styles.fullEventImageStyle
      }
    })
    // TODO: For now in writable mode, always put in the end push the activity
    // icon. Maybe later change UI to add it only if no images present. However
    // this woudl require to define way how to add image when there are existing
    if (images.length === 0 || !this.isReadOnly()) {
      imageItems.push({
        source: getActivityImage(this.props.activity.event_category),
        style: styles.circleImageStyle
      })
    }

    return (
      <View style={styles.containerStyle}>
        <Item bordered />
        <FlatList
           horizontal
           showsHorizontalScrollIndicator={false}
           onViewableItemsChanged={this.onViewableItemsChanged}
           viewabilityConfig={viewabilityConfig}
           data={imageItems}
           renderItem={this.renderItem}
           keyExtractor={(item, index) => index.toString()}
        />
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
                <Text style={styles.eventDateStyle}>{eventDate}</Text>
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
  eventDateStyle: {
    color: '#fff',
    fontSize: 20
  },
  darkBackgroundStyle: {
    width: CONTENT_WIDTH,
    height: 90,
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
