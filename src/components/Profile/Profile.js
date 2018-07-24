/* Copyright 2018, Socializing Syndicate Corp. */
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
  Image,
  TextInput,
  View,
  ScrollView
} from 'react-native'
import {
  Container,
  Item,
  Text,
  Thumbnail
} from 'native-base'
import { LGButton } from '../common'
import { CONTENT_HEIGHT } from '../common/Constants'
import ProfileActivitiesContainer from './ProfileActivitiesContainer'
import Moments from './Moments'

const getUser = (props) => {
  return props.otherUserInfo
    ? props.otherUserInfo
    : props.user.user
}

const getUserId = (props) => {
  return props.otherUserInfo
    ? props.otherUserInfo.user_id
    : props.user.user.id
}

const getUserpic = (user) => {
  if (user.user_image_url) {
    return user.user_image_url
  }
  return user && 'images' in user && user.images.length > 0
    ? user.images[0].image_url
    : ''
}

const ImageView = ({ imageUrl }) => {
  const { imageStyle } = styles
  const source = imageUrl ? { uri: imageUrl } : null
  return (
      <View>
        <Image style={imageStyle} source={source} />
      </View>
  )
}

const EditButton = ({ forOtherUser, userId, style }) => {
  // const { editButtonStyle } = styles

  if (forOtherUser) {
    //console.log('EditButton:', userId)
    return (
      <Container style={style}>
        <LGButton
          onPress={() => Actions.chat({ origin: 'Profile', chatmateId: userId })}
          buttonText="message"
        />
      </Container>
    )
  }
  return (
    <Container style={style}>
      <LGButton
        onPress={() => Actions.profileEdit({ origin: 'Profile' })}
        buttonText="edit"
      />
    </Container>
  )
}
const timenow = moment()
console.log('TIMENOW is ', timenow)


class Profile extends Component {


    renderEditButton(userId, forOtherUser, style) {
      if (forOtherUser) return
      return <EditButton forOtherUser={forOtherUser} style={style} userId={userId} />
    }
    renderMessageButton(userId, forOtherUser, style) {
      if (!forOtherUser) return
      return <EditButton forOtherUser={forOtherUser} style={style} userId={userId} />
    }

  render() {
    const { forOtherUser } = this.props

    const user = getUser(this.props) // This will not work properly, will fix it
    const userId = getUserId(this.props)
    const firstName = user.first_name.toUpperCase()
    const lastName = user.last_name.charAt(0).toUpperCase()
    const age = moment.duration(moment().diff(user.birthday)).years()

    const {
      outterContainerStyle,
      nameItemStyle,
      nameTextStyle,
      itemsCenterFlex,
      descriptionTextStyle,
      editButtonStyle,
      messageButtonStyle,
      userImageSmall,
    } = styles

    return (
      <ScrollView style={outterContainerStyle}>
        <View style={itemsCenterFlex}>
          <ImageView imageUrl={getUserpic(user)} />

          <Item style={nameItemStyle}>
            <Text style={nameTextStyle}>
              {firstName} {lastName}, {age}
            </Text>
          </Item>

          <TextInput
            style={descriptionTextStyle}
            value={user.about ? user.about : user.user_about}
            editable={false}
            multiline
          />

          {this.renderEditButton(userId, forOtherUser, editButtonStyle)}
          {this.renderMessageButton(userId, forOtherUser, messageButtonStyle)}

        </View>
        <Item
          bordered
          style={{ justifyContent: 'center' }}
        >
           <Thumbnail
            style={userImageSmall}
            source={{ uri: user.images[0].image_url }}
           />
        </Item>
        <ProfileActivitiesContainer />
        <Moments />
      </ScrollView>
    )
  }
}

const styles = {
  outterContainerStyle: {
    backgroundColor: 'transparent',
    height: CONTENT_HEIGHT,
  },
  editButtonStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 20,
    width: 90,
    zIndex: 100
  },
  messageButtonStyle: {
    backgroundColor: 'transparent',
    marginTop: 15,
    width: 140,
    height: 40,
    zIndex: 100
  },
  itemsCenterFlex: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    marginTop: 40,
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
    height: 50,
    borderColor: 'transparent'
   },
  nameTextStyle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  descriptionTextStyle: {
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
   userImageSmall: {
     width: 55,
     height: 55,
     borderColor: '#fff',
     borderWidth: 3,
     position: 'absolute'
   },
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Profile)
