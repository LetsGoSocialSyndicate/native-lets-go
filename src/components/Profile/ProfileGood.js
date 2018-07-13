/* Copyright 2018, Socializing Syndicate Corp. */
import moment from 'moment'
import React, { Component } from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { showImagePicker } from 'react-native-image-picker'
import { connect } from 'react-redux'

import { Button, Card, CardSection, LoadingButton } from '../common'
import { IMAGE_OP_NONE, IMAGE_OP_UPDATE, IMAGE_OP_ADD } from '../../actions/imageOp'
import {
  cancelEditing,
  startEditing,
  updateProfile
} from '../../actions/userAction'

const getUser = (props) => {
  return props.forOtherUser
    ? props.user.otherUser
    : props.user.user
}

const isReadOnly = (props) => {
  return props.forOtherUser || props.user.isReadOnly
}

const getUserpic = (user) => {
  return user && 'images' in user && user.images.length > 0
    ? user.images[0].image_url
    : ''
}

const getUserpicId = (user) => {
  return user && 'images' in user && user.images.length > 0
    ? user.images[0].id
    : null
}

const LoadingImageButton = ({ loading, readOnly, onPress, imageUrl }) => {
  if (loading) {
    return (
      <View style={styles.layoutView}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }
  const imageStyle = readOnly ? styles.imageReadOnly : styles.image
  const source = imageUrl ? { uri: imageUrl } : null
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.layoutView}>
        <Image style={imageStyle} source={source} />
      </View>
    </TouchableOpacity>
  )
}

class Profile extends Component {
  state = {
    // Currently shown (possibly modified) profile details in UI.
    user: {},
    // Currently shown profile userpic in UI.
    currentImageUrl: '',
    // Transient state of loading image to UI.
    imageLoading: false,
    // Inidicates if profile userpic need to be deleted/added/updated on server
    profileImageOp: IMAGE_OP_NONE
  }

  componentDidMount() {
    console.log('Profile.componentDidMount', this.state)
    const user = getUser(this.props)
    this.setState({ user, currentImageUrl: getUserpic(user) })
  }

  constructEditButton() {
    return (
      <CardSection>
        <Button onPress={this.props.startEditingAction}>
          Edit
        </Button>
      </CardSection>
    )
  }

  buildImageRequest() {
    // For now returning array of 1 - we allow only 1 profile userpic
    return [{
       op: this.state.profileImageOp,
       id: getUserpicId(this.state.user),
       image_url: this.state.currentImageUrl
    }]
  }

  constructSaveCancelButtons() {
    const originalUser = getUser(this.props)
    const onSave = () => {
      let imageRequest = []
      if (this.state.profileImageOp !== IMAGE_OP_NONE) {
        imageRequest = this.buildImageRequest()
      }
      this.props.updateProfileAction(
        this.state.user, originalUser.id, this.props.auth.token, imageRequest)
      .then(() => {
        // After the server update completes we need to update
        // internal state with fetched user data.
        const updatedUser = getUser(this.props)
        this.setState({
          ...this.state,
          user: updatedUser,
          currentImageUrl: getUserpic(updatedUser),
          profileImageOp: IMAGE_OP_NONE
        })
      })
    }
    const onCancel = () => {
      this.props.cancelEditingAction()
      // Revert state back to original settings.
      this.setState({
        ...this.state,
        user: originalUser,
        currentImageUrl: getUserpic(originalUser),
        profileImageOp: IMAGE_OP_NONE
      })
    }
    return (
      <CardSection>
        <LoadingButton loading={this.props.user.updating} onPress={onSave}>
          Save
        </LoadingButton>
        <Button onPress={onCancel}>
          Cancel
        </Button>
      </CardSection>
    )
  }

  selectImage() {
    this.setState({ ...this.state, imageLoading: true })
    showImagePicker({}, (response) => {
      // Profile userpic was modified - added or updated.
      const op = getUserpicId(this.state.user) ? IMAGE_OP_UPDATE : IMAGE_OP_ADD
      this.setState({
        ...this.state,
        imageLoading: false,
        currentImageUrl: response.uri,
        profileImageOp: op
      })
    })
  }

  saveAbout(about) {
    this.setState({ ...this.state, user: { ...this.state.user, about } })
  }

  render() {
    console.log('Profile.render', this.state)
    if (Object.keys(this.state.user).length === 0) {
      return <Card />
    }
    const user = this.state.user
    const readOnly = isReadOnly(this.props)
    const lastName = user.last_name.charAt(0)
    const age = moment.duration(moment().diff(user.birthday)).years()
    const onImagePress = readOnly ? () => {} : () => this.selectImage()
    const saveAbout = about => this.saveAbout(about)
    let buttons = null
    if (!this.props.forOtherUser) {
      if (readOnly) {
        buttons = this.constructEditButton()
      } else {
        buttons = this.constructSaveCancelButtons()
      }
    }

    return (
      <Card>
        <LoadingImageButton
          loading={this.state.imageLoading}
          readOnly={readOnly}
          onPress={onImagePress}
          imageUrl={this.state.currentImageUrl}
        />
        <View style={styles.layoutView}>
          <Text>{user.first_name} {lastName}, {age}</Text>
        </View>
        <View style={styles.layoutView}>
          <TextInput
            style={styles.textInputStyle}
            value={user.about}
            editable={!readOnly}
            multiline
            numberOfLines={5}
            onChangeText={saveAbout}
          />
        </View>
        {buttons}
      </Card>
    )
  }
}

const styles = {
  imageReadOnly: {
    height: 100,
    borderRadius: 50,
    width: 100,
  },
  image: {
    height: 100,
    borderRadius: 50,
    width: 100,
    borderColor: 'yellow',
    borderWidth: 5,
  },
  layoutView: {
     justifyContent: 'center',
     alignItems: 'center'
   },
   textInputStyle: {
     borderColor: 'gray',
     borderWidth: 1,
     height: 40,
     width: 100
   },
}

const mapStateToProps = (state) => {
  return { user: state.user, auth: state.auth }
}

const actions = {
  cancelEditingAction: cancelEditing,
  // fetchOtherUserAction: fetchOtherUser,
  startEditingAction: startEditing,
  updateProfileAction: updateProfile,
}
export default connect(mapStateToProps, actions)(Profile)
