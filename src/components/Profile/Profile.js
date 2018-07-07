/* Copyright 2018, Socializing Syndicate Corp. */
import moment from 'moment'
import React, { Component } from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { showImagePicker } from 'react-native-image-picker'
import { connect } from 'react-redux'

import { Button, Card, CardSection, LoadingButton } from '../common'
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

const LoadingImageButton = ({ loading, readOnly, onPress, imageUrl }) => {
  if (loading) {
    return (
      <View style={styles.layoutView}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }
  const imageStyle = readOnly ? styles.imageReadOnly : styles.image
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.layoutView}>
        <Image style={imageStyle} source={{ uri: imageUrl }} />
      </View>
    </TouchableOpacity>
  )
}

class Profile extends Component {
  state = {
    user: {},
    currentImageUrl: '',
    imageLoading: false
  }

  componentDidMount() {
    const user = getUser(this.props)
    this.setState({ user, currentImageUrl: user.image_url })
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

  constructSaveCancelButtons(user) {
    const onSave = () => {
      // TODO: Need to get here url from cloudinary.
      //       Maybe first to upload image to cloudinary and then patch
      //       this.state.user with the url
      const updatedUser = {
        ...this.state.user,
        image_url: this.state.currentImageUrl
      }
      this.props.updateProfileAction(
        updatedUser, user, this.props.auth.token)
    }
    const onCancel = () => {
      this.props.cancelEditingAction()
      this.setState({ ...this.state, user, currentImageUrl: user.image_url })
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
      this.setState({
        ...this.state,
        imageLoading: false,
        currentImageUrl: response.uri
      })
    })
  }

  saveAbout(about) {
    this.setState({ ...this.state, user: { ...this.state.user, about } })
  }

  render() {
    console.log('Profile.render', this.state)
    const user = getUser(this.props)
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
        buttons = this.constructSaveCancelButtons(user)
      }
    }

    // TODO: Instead patching, verify it is https.
    const imageUrl = this.state.currentImageUrl
      ? this.state.currentImageUrl.replace('http:', 'https:')
      : ''

    return (
      <Card>
        <LoadingImageButton
          loading={this.state.imageLoading}
          readOnly={readOnly}
          onPress={onImagePress}
          imageUrl={imageUrl}
        />
        <View style={styles.layoutView}>
          <Text>{user.first_name} {lastName}, {age}</Text>
        </View>
        <View style={styles.layoutView}>
          <TextInput
            style={styles.textInputStyle}
            value={this.state.user.about}
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
  updateProfileAction: updateProfile
}
export default connect(mapStateToProps, actions)(Profile)
