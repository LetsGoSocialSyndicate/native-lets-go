/* Copyright 2018, Socializing Syndicate Corp. */
import moment from 'moment'
import { Container, Card, Form, Item } from 'native-base'
import React, { Component } from 'react'
import { TextInput, View } from 'react-native'
import DatePicker from 'react-native-datepicker'
import { showImagePicker } from 'react-native-image-picker'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { IMAGE_OP_NONE, IMAGE_OP_UPDATE, IMAGE_OP_ADD } from '../../actions/imageOp'
import { updateProfile } from '../../actions/userAction'
import { Input } from '../common'
import { DATE_FORMAT, CONTENT_HEIGHT } from '../common/Constants'
import { downsizeImage, getFileExtension, getUserpicSource } from '../common/ImageUtils'
import LoadingButton from '../common/LoadingButton'

const submitButton = require('../../assets/buttons/done.png')

const FIRST_NAME_FIELD = 'firstName'
const LAST_NAME_FIELD = 'lastName'
const BIRTHDAY_FIELD = 'birthday'

const getUserpic = user => {
  return user && 'images' in user && user.images.length > 0
    ? user.images[0].image_url
    : null
}

const getUserpicId = user => {
  return user && 'images' in user && user.images.length > 0
    ? user.images[0].id
    : null
}

class ProfileEdit extends Component {
  state = {
    user: {},
    currentImageUrl: '',
    imageExt: '',
    imageLoading: false,
    profileImageOp: IMAGE_OP_NONE,
    aboutBoxHeight: 40
  }

  componentDidMount() {
    const user = this.getUser()
    this.setState({ user, currentImageUrl: getUserpic(user) })
  }

  getUser = () => {
    return this.props.user.user
  }

  getAboutBoxStyle = () => {
    return { ...styles.descriptionTextStyle, height: this.state.aboutBoxHeight }
  }

  updateAboutBoxHeight = height => {
      this.setState({ ...this.state, aboutBoxHeight: height + 40 })
  }

  saveAbout = about => {
    this.setState({ ...this.state, user: { ...this.state.user, about } })
  }

  saveFirstName = first_name => {  // eslint-disable-line camelcase
    this.setState({ ...this.state, user: { ...this.state.user, first_name } })
  }

  saveLastName = last_name => { // eslint-disable-line camelcase
    this.setState({ ...this.state, user: { ...this.state.user, last_name } })
  }

  saveBirthday = birthday => {
    this.setState({ ...this.state, user: { ...this.state.user, birthday } })
  }

  buildImageRequest = () => {
    // For now returning array of 1 - we allow only 1 profile userpic
    return [{
       op: this.state.profileImageOp,
       id: getUserpicId(this.state.user),
       image_url: this.state.currentImageUrl,
       image_ext: this.state.imageExt
    }]
  }

  selectImage = () => {
    this.setState({ ...this.state, imageLoading: true })
    showImagePicker({}, (response) => {
      console.log('Profile.selectImage:', response)
      if (response.didCancel) {
        this.setState({ ...this.state, imageLoading: false })
      } else {
        // Profile userpic was modified - added or updated.
        const op = getUserpicId(this.state.user) ? IMAGE_OP_UPDATE : IMAGE_OP_ADD
        const imageExt = getFileExtension(response.fileName)
        downsizeImage(response.uri, imageExt, response.width, response.height)
        .then(([uri, ext]) => {
          this.setState({
            ...this.state,
            imageLoading: false,
            // currentImageUrl: `data:image/${ext};base64,${response.data}`,
            currentImageUrl: uri,
            imageExt: ext,
            profileImageOp: op,
          })
        })
      }
    })
  }

  constructSubmitButton = () => {
    const originalUser = this.getUser()
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
            const updatedUser = this.getUser()
            this.setState({
              ...this.state,
              user: updatedUser,
              currentImageUrl: getUserpic(updatedUser),
              profileImageOp: IMAGE_OP_NONE
            })
          })
          .then(() => {
              console.log('UPDATED STATE: ', this.state)
              // In order to force refresh, we need to provide refresh state
              // different than previous. Using current millis as unique value
              // does the work.
              Actions.pop({ refresh: { test: moment().valueOf() } })
            })
    }
    return (
      <LoadingButton
        loading={this.props.user.updating}
        onPress={onSave}
        source={submitButton}
        imageStyle={styles.buttonSubmitStyle}
      />
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
    datePickerStyle,
    imageStyle
  } = styles
  const descriptionTextStyle = this.getAboutBoxStyle()

  return (
    <Container style={outterContainerStyle}>
      <View style={itemsCenterFlex}>
        <LoadingButton
          loading={this.state.imageLoading}
          onPress={onImagePress}
          source={getUserpicSource(this.state.currentImageUrl)}
          imageStyle={imageStyle}
        />

        <Form style={formStyle}>
          <Item style={itemStyle}>
            <Input
            name={FIRST_NAME_FIELD}
            value={user.first_name}
            onChangeText={saveFirstName}
            />
          </Item>

          <Item style={itemStyle}>
            <Input
             name={LAST_NAME_FIELD}
             value={user.last_name}
             onChangeText={saveLastName}
            />
          </Item>

          <Item style={itemStyle}>
            <DatePicker
              name={BIRTHDAY_FIELD}
              maxDate={moment().utc().subtract(17, 'years').format(DATE_FORMAT)}
              onDateChange={saveBirthday}
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
    marginTop: 15
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
     marginTop: 16,
     paddingTop: 8,
     paddingBottom: 8,
     paddingLeft: 20,
     paddingRight: 20,
     fontSize: 16,
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
  updateProfileAction: updateProfile,
}
export default connect(mapStateToProps, actions)(ProfileEdit)
