// /*
//  * Copyright 2018, Socializing Syndicate Corp.
//  */
// import moment from 'moment'
// import React from 'react'
// import { reduxForm } from 'redux-form'
// import { connect } from 'react-redux'
// import {
//   ActivityIndicator,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   TouchableHighlight,
//   View } from 'react-native'
// import {
//   Form,
//   Container,
//   Card,
//   Item,
//   Text } from 'native-base'
// import { showImagePicker } from 'react-native-image-picker'
//
// import { IMAGE_OP_NONE, IMAGE_OP_UPDATE, IMAGE_OP_ADD } from '../../actions/imageOp'
// import {
//   cancelEditing,
//   startEditing,
//   updateProfile
// } from '../../actions/userAction'
// import { DATE_FORMAT } from '../common/Constants'
// import {
//   DatePickerInputFormField,
//   Error,
//   TextInputFormField
//  } from '../common'
// import LoadingButton from '../common/LoadingButton'
//
// const submitButton = require('../../assets/buttons/submit.png')
// const FIRST_NAME_FIELD = 'firstName'
// const LAST_NAME_FIELD = 'lastName'
// const BIRTHDAY_FIELD = 'birthday'
// const ABOUT = 'about'
//
// const getUser = (props) => {
//   return props.forOtherUser
//     ? props.user.otherUser
//     : props.user.user
// }
//
// const getFileExtension = (filename) => {
//   return filename.split('.').pop().toLowerCase()
// }
//
// const getUserpic = (user) => {
//   return user && 'images' in user && user.images.length > 0
//     ? user.images[0].image_url
//     : ''
// }
//
// const getUserpicId = (user) => {
//   return user && 'images' in user && user.images.length > 0
//     ? user.images[0].id
//     : null
// }
//
// const LoadingImageButton = ({ loading, onPress, imageUrl }) => {
//   if (loading) {
//     return (
//       <View>
//         <ActivityIndicator size={'large'} />
//       </View>
//     )
//   }
//   const {
//     image
//   } = styles
//
//   const source = imageUrl ? { uri: imageUrl } : null
//
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <View>
//         <Image style={image} source={source} />
//       </View>
//     </TouchableOpacity>
//   )
// }
// class ProfileEditForm extends Component {
//   state = {
//     // Currently shown (possibly modified) profile details in UI.
//     user: {},
//     // Currently shown profile userpic in UI.
//     currentImageUrl: '',
//     // Transient state of loading image to UI.
//     imageLoading: false,
//     // Inidicates if profile userpic need to be deleted/added/updated on server
//     profileImageOp: IMAGE_OP_NONE
//   }
//
//   componentDidMount() {
//     console.log('Profile.componentDidMount', this.state)
//     const user = getUser(this.props)
//     this.setState({ user, currentImageUrl: getUserpic(user) })
//   }
//
//   selectImage() {
//     this.setState({ ...this.state, imageLoading: true })
//     showImagePicker({}, (response) => {
//       // Profile userpic was modified - added or updated.
//       const op = getUserpicId(this.state.user) ? IMAGE_OP_UPDATE : IMAGE_OP_ADD
//       const ext = getFileExtension(response.fileName)
//       this.setState({
//         ...this.state,
//         imageLoading: false,
//         currentImageUrl: `data:image/${ext};base64,${response.data}`,
//         profileImageOp: op
//       })
//     })
//   }
//
//   saveAbout(about) {
//     this.setState({ ...this.state, user: { ...this.state.user, about } })
//   }
//   console.log('Profile.render', this.state)
//   if (Object.keys(this.state.user).length === 0) {
//     return <Card />
//   }
//   const user = this.state.user
//   const readOnly = isReadOnly(this.props)
//   const lastName = user.last_name.charAt(0)
//   const age = moment.duration(moment().diff(user.birthday)).years()
//   const onImagePress = readOnly ? () => {} : () => this.selectImage()
//   const saveAbout = about => this.saveAbout(about)
//   let button = null
//   if (!this.props.forOtherUser) {
//     if (readOnly) {
//       button = this.constructEditButton()
//     } else {
//       button = this.constructSaveCancelButtons()
//     }
//   }
//
//
//   return (
//     <Form style={formStyle}>
//       <LoadingImageButton
//         loading={this.state.imageLoading}
//         onPress={onImagePress}
//         imageUrl={this.state.currentImageUrl}
//       />
//
//       <Item style={itemStyle}>
//         <TextInputFormField
//         name={FIRST_NAME_FIELD}
//         placeholder='first name'
//         />
//       </Item>
//
//       <Item style={itemStyle}>
//         <TextInputFormField
//          name={LAST_NAME_FIELD}
//          placeholder='last name'
//         />
//       </Item>
//       <Item style={itemStyle}>
//        <DatePickerInputFormField
//          name={BIRTHDAY_FIELD}
//          placeholder='select birthday'
//          maxDate={moment().utc().subtract(18, 'years').format(DATE_FORMAT)}
//        />
//       </Item>
//
//
//       <Error
//         // error={auth.error}
//       />
//       <LoadingButton
//         loading={auth.loading}
//         onPress={handleSubmit}
//         style={buttonSubmitStyle}
//         transparent
//         source={submitButton}
//       />
//     </Form>
//    )
//  }
//
//  const styles = {
//    buttonSubmitStyle: {
//      width: 150,
//      height: 80,
//      alignSelf: 'center',
//      marginTop: 10
//    },
//    formStyle: {
//      marginTop: 35,
//      height: 60
//    },
//    itemStyle: {
//      marginLeft: 50,
//      marginRight: 50,
//      marginTop: 10
//    }
//  }
//
//  const mapStateToProps = (state) => {
//    // return { auth: state.auth }
//  }
//  export default connect(mapStateToProps)(reduxForm({ form: 'profileEdit' })(ProfileEditForm))
