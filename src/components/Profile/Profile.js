/* Copyright 2018, Socializing Syndicate Corp. */
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showImagePicker } from 'react-native-image-picker'
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  View } from 'react-native'
import {
  Container,
  Card,
  Item,
  Text,
} from 'native-base'
import { IMAGE_OP_NONE, IMAGE_OP_UPDATE, IMAGE_OP_ADD } from '../../actions/imageOp'
import {
  cancelEditing,
  startEditing,
  updateProfile
} from '../../actions/userAction'

//TODO: change later to real Edit icon
const editIcon = require('../../assets/buttons/edit.png')
const doneButton = require('../../assets/buttons/add.png')

const getUser = (props) => {
  return props.forOtherUser
    ? props.user.otherUser
    : props.user.user
}

const isReadOnly = (props) => {
  return props.forOtherUser || props.user.isReadOnly
}

const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
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
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }
  const {
    imageReadOnly,
    image
  } = styles
  const imageStyle = readOnly ? imageReadOnly : image
  const source = imageUrl ? { uri: imageUrl } : null

  return (
    <TouchableOpacity onPress={onPress}>
      <View>
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
    const { iconStyle } = styles
    return (
      <TouchableHighlight onPress={this.props.startEditingAction}>
        <Image
          source={editIcon}
          style={iconStyle}
        />
      </TouchableHighlight>
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

    //this is Done button
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

    //TODO: This functionality need to transfer to back button in navigation bar
    // const onCancel = () => {
    //   this.props.cancelEditingAction()
    //   // Revert state back to original settings.
    //   this.setState({
    //     ...this.state,
    //     user: originalUser,
    //     currentImageUrl: getUserpic(originalUser),
    //     profileImageOp: IMAGE_OP_NONE
    //   })
    // }
    const { iconStyle } = styles
    return (
      <TouchableHighlight onPress={onSave}>
        <Image
          source={doneButton}
          style={iconStyle}
        />
      </TouchableHighlight>
    )
      // <CardSection>
      //   <LoadingButton loading={this.props.user.updating} onPress={onSave}>
      //     done
      //   </LoadingButton>
      // <Button onPress={onCancel}>
      //    cancel
      //  </Button>
      // </CardSection>
  }

  selectImage() {
    this.setState({ ...this.state, imageLoading: true })
    showImagePicker({}, (response) => {
      if (response.didCancel) {
        this.setState({
          ...this.state,
          imageLoading: false
        })
      } else {
        // Profile userpic was modified - added or updated.
        const op = getUserpicId(this.state.user) ? IMAGE_OP_UPDATE : IMAGE_OP_ADD
        const ext = getFileExtension(response.fileName)
        this.setState({
          ...this.state,
          imageLoading: false,
          currentImageUrl: `data:image/${ext};base64,${response.data}`,
          profileImageOp: op
        })
      }
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
    let button = null
    if (!this.props.forOtherUser) {
      if (readOnly) {
        button = this.constructEditButton()
      } else {
        button = this.constructSaveCancelButtons()
      }
    }
    const {
      outterContainerStyle,
      containerStyle,
      nameItemStyle,
      nameTextStyle,
      descriptionTextStyle,
      itemsCenterFlex,
    } = styles

    return (
      <Container style={outterContainerStyle}>
        <Container style={containerStyle}>
          {button}
        </Container>

        <View style={itemsCenterFlex}>

          <LoadingImageButton
            loading={this.state.imageLoading}
            readOnly={readOnly}
            onPress={onImagePress}
            imageUrl={this.state.currentImageUrl}
          />

          <Item style={nameItemStyle}>
            <Text style={nameTextStyle}>
              {user.first_name.toUpperCase()} {lastName.toUpperCase()}, {age}
            </Text>
          </Item>

          <Item>
            <TextInput
              style={descriptionTextStyle}
              value={user.about}
              editable={!readOnly}
              multiline
              numberOfLines={10}
              onChangeText={saveAbout}
            />
          </Item>
        </View>
      </Container>
    )
  }
}

const styles = {
  outterContainerStyle: {
    backgroundColor: 'transparent',
    height: 300,
  },
  containerStyle: {
    backgroundColor: 'transparent'
  },
  imageReadOnly: {
    height: 200,
    borderRadius: 100,
    width: 200,
    borderColor: 'white',
    borderWidth: 8
  },
  image: {
    height: 200,
    borderRadius: 100,
    width: 200,
    borderColor: 'white',
    borderWidth: 8
  },
  nameItemStyle: {
     justifyContent: 'center',
     alignItems: 'center',
     marginTop: 5,
     height: 70,
     borderColor: 'transparent'
   },
  nameTextStyle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  descriptionTextStyle: {
     paddingTop: 10,
     paddingBottom: 10,
     paddingLeft: 20,
     paddingRight: 20,
     fontSize: 18,
     color: 'white',
     backgroundColor: '#4380B0',
     borderRadius: 15,
     height: 80,
     width: 300
   },
   iconStyle: {
     position: 'absolute',
     right: 50,
     top: 50,
     width: 30,
     height: 30
   },
   itemsCenterFlex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20
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
