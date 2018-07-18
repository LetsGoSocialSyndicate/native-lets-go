/* Copyright 2018, Socializing Syndicate Corp. */
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  View } from 'react-native'
import {
  Container,
  Card,
  Item,
  Text,
} from 'native-base'
import { LGButton } from '../common'
import { IMAGE_OP_NONE } from '../../actions/imageOp'
import { startEditing } from '../../actions/userAction'


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

const LoadingImageButton = ({ loading, imageUrl }) => {
  if (loading) {
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }
  const { imageStyle } = styles
  const source = imageUrl ? { uri: imageUrl } : null

  return (
    <TouchableOpacity>
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

  buildImageRequest() {
    // For now returning array of 1 - we allow only 1 profile userpic
    return [{
       op: this.state.profileImageOp,
       id: getUserpicId(this.state.user),
       image_url: this.state.currentImageUrl
    }]
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
    const {
      outterContainerStyle,
      nameItemStyle,
      nameTextStyle,
      descriptionTextStyle,
      itemsCenterFlex,
      editButtonStyle
    } = styles

    return (
      <Container style={outterContainerStyle}>
        <Container style={editButtonStyle}>
          <LGButton
            onPress={() => Actions.profileEdit()}
            buttonText="edit"
          />
        </Container>
        <View style={itemsCenterFlex}>

          <LoadingImageButton
            loading={this.state.imageLoading}
            imageUrl={this.state.currentImageUrl}
          />

          <Item style={nameItemStyle}>
            <Text style={nameTextStyle}>
              {user.first_name.toUpperCase()} {lastName.toUpperCase()}, {age}
            </Text>
          </Item>

          <TextInput
            style={descriptionTextStyle}
            value={user.about}
            editable={!readOnly}
            multiline
            numberOfLines={10}
          />
        </View>
      </Container>
    )
  }
}

const styles = {
  outterContainerStyle: {
    backgroundColor: 'transparent',
    height: 450,
  },
  editButtonStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 30,
    top: 20,
    width: 90,
    height: 40,
    zIndex: 100
  },
  itemsCenterFlex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20
  },
  imageStyle: {
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

}

const mapStateToProps = (state) => {
  return { user: state.user, auth: state.auth }
}

const actions = {
  // fetchOtherUserAction: fetchOtherUser,
  startEditingAction: startEditing,
}
export default connect(mapStateToProps, actions)(Profile)
