/* Copyright 2018, Socializing Syndicate Corp. */
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { showImagePicker } from 'react-native-image-picker'
import DatePicker from 'react-native-datepicker'
import {
  Image,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  TouchableHighlight
 } from 'react-native'
import { Container, Card, Form, Item } from 'native-base'
import { cancelEditing, updateProfile } from '../../actions/userAction'
import { DATE_FORMAT, CONTENT_HEIGHT } from '../common/Constants'
import { Input } from '../common'
import { IMAGE_OP_NONE, IMAGE_OP_UPDATE, IMAGE_OP_ADD } from '../../actions/imageOp'

const defaultUser = require('../../assets/default.png')
//TODO: change later to real DONE button
const submitButton = require('../../assets/buttons/submit.png')

const FIRST_NAME_FIELD = 'firstName'
const LAST_NAME_FIELD = 'lastName'
const BIRTHDAY_FIELD = 'birthday'

const getUser = (props) => props.user.user
// const isReadOnly = (props) => props.user.isReadOnly
const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase()
}

const getUserpic = (user) => {
  return user && 'images' in user && user.images.length > 0
    ? user.images[0].image_url
    : defaultUser
}

const getUserpicId = (user) => {
  return user && 'images' in user && user.images.length > 0
    ? user.images[0].id
    : null
}

const LoadingImageButton = ({ loading, onPress, imageUrl }) => {
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
    <TouchableOpacity onPress={onPress}>
      <View>
        <Image style={imageStyle} source={source} />
      </View>
    </TouchableOpacity>
  )
}

class ProfileEdit extends Component {
  state = {
    user: {},
    currentImageUrl: '',
    imageLoading: false,
    profileImageOp: IMAGE_OP_NONE,
    aboutBoxHeight: 40
  }

  componentDidMount() {
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
  updateAboutBoxHeight(height) {
      this.setState({ ...this.state, aboutBoxHeight: height + 40 })
  }
  getAboutBoxStyle() {
    return { ...styles.descriptionTextStyle, height: this.state.aboutBoxHeight }
  }
  saveFirstName(first_name) {
    console.log('Inside saveFirstName:', first_name)
    console.log('Inside saveFirstName state:', this.state)

    this.setState({ ...this.state, user: { ...this.state.user, first_name } })
  }

  saveLastName(last_name) {
    this.setState({ ...this.state, user: { ...this.state.user, last_name } })
  }

  saveBirthday(birthday) {
    this.setState({ ...this.state, user: { ...this.state.user, birthday } })
  }

  constructSubmitButton() {
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
            console.log('updatedUser---->', updatedUser)
            this.setState({
              ...this.state,
              user: updatedUser,
              currentImageUrl: getUserpic(updatedUser),
              profileImageOp: IMAGE_OP_NONE
            })
          })
          .then(() => {
              console.log('UPDATED STATE: ', this.state)
              // TODO: Need proper rerender here
              // Actions.pop({ refresh: {} })
              // Actions.refresh()
              // pop and refresh are not working. This is workaround,
              // but it will have problems with BACK.
              // PARENT --> Profile --> ProfileEdit --> Profile.
              // And should be: PARENT --> Profile
              Actions.profile()
            })
    }
    return (
      <TouchableHighlight onPress={onSave}>
        <Image
          source={submitButton}
          style={styles.buttonSubmitStyle}
        />
      </TouchableHighlight>
    )
  }

render() {
  if (Object.keys(this.state.user).length === 0) {
    return <Card />
  }

  const user = this.state.user
  const saveAbout = about => this.saveAbout(about)
  const saveFirstName = firstName => this.saveFirstName(firstName)
  const saveLastName = lastName => this.saveLastName(lastName)
  const birthday = user.birthday.split('T')[0]
  const saveBirthday = bd => this.saveBirthday(bd)
  const onImagePress = () => this.selectImage()
  const button = this.constructSubmitButton()
  const onContentSizeChange = e => this.updateAboutBoxHeight(e.nativeEvent.contentSize.height)
  const {
    outterContainerStyle,
    itemsCenterFlex,
    formStyle,
    itemStyle,
    datePickerStyle
  } = styles
  const descriptionTextStyle = this.getAboutBoxStyle()

  return (
    <Container style={outterContainerStyle}>
      <View style={itemsCenterFlex}>

        <LoadingImageButton
          loading={this.state.imageLoading}
          onPress={onImagePress}
          imageUrl={this.state.currentImageUrl}
        />

        <Form style={formStyle}>
          <Item style={itemStyle}>
            <Input
            name={FIRST_NAME_FIELD}
            value={user.first_name}
            //placeholder={user.first_name}
            onChangeText={saveFirstName}
            />
          </Item>

          <Item style={itemStyle}>
            <Input
             name={LAST_NAME_FIELD}
             value={user.last_name}
             //placeholder={user.last_name}
             onChangeText={saveLastName}
            />
          </Item>

          <Item style={itemStyle}>
            <DatePicker
              name={BIRTHDAY_FIELD}
              maxDate={moment().utc().subtract(17, 'years').format(DATE_FORMAT)}
              onDateChange={saveBirthday}
              //value={birthday}
              placeholder={birthday}
              mode='date'
              format={DATE_FORMAT}
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              showIcon={false}
              style={datePickerStyle}
              customStyles={{
              dateText: {
                marginRight: 65,
                color: '#27608b',
                fontSize: 20,
              },
              dateInput: {
                borderWidth: 0
              },
              placeholderText: {
                marginRight: 65,
                fontSize: 20,
                color: 'hsla(206, 56%, 35%, 0.5)'
              }
              }}
            />
          </Item>
          <TextInput
            autoCapitalize='none'
            placeholder='Please describe yourself...'
            style={descriptionTextStyle}
            value={user.about}
            multiline
            maxLength={200}
            onChangeText={saveAbout}
            onContentSizeChange={onContentSizeChange}
          />
          {button}
        </Form>
      </View>
    </Container>
  )
  }
}

const styles = {
  outterContainerStyle: {
    backgroundColor: 'transparent',
    height: CONTENT_HEIGHT,
  },
  itemsCenterFlex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20
  },
  imageStyle: {
    height: 100,
    borderRadius: 50,
    width: 100,
    borderColor: 'white',
    borderWidth: 8
  },
  imageContainerStyle: {
    marginTop: 50,
    backgroundColor: 'transparent',
  },
  buttonSubmitStyle: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginTop: 20
  },
  formStyle: {
    height: 350
  },
  itemStyle: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10
  },
  descriptionTextStyle: {
     marginTop: 20,
     paddingTop: 10,
     paddingBottom: 10,
     paddingLeft: 20,
     paddingRight: 20,
     fontSize: 18,
     color: 'white',
     backgroundColor: '#4380B0',
     borderRadius: 15,
     width: 300
   },
   datePickerStyle: {
     width: 200,
   },
}
const mapStateToProps = (state) => {
  return { user: state.user, auth: state.auth }
}

const actions = {
  cancelEditingAction: cancelEditing,
  updateProfileAction: updateProfile,
}

export default connect(mapStateToProps, actions)(ProfileEdit)
