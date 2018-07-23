/* Copyright 2018, Socializing Syndicate Corp. */
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
  Image,
  TextInput,
  View } from 'react-native'
import {
  Container,
  Item,
  Text,
} from 'native-base'
import { LGButton } from '../common'
import { CONTENT_HEIGHT } from '../common/Constants'


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

const getUserpic = (user) => (
  user.user_image_url ?
    user.user_image_url :
    user && 'images' in user && user.images.length > 0
    ? user.images[0].image_url
    : ''
)

const ImageView = ({ imageUrl }) => {
  const { imageStyle } = styles
  const source = imageUrl ? { uri: imageUrl } : null
  return (
      <View>
        <Image style={imageStyle} source={source} />
      </View>
  )
}

const EditButton = ({ forOtherUser, userId }) => {
  const { editButtonStyle } = styles

  if (forOtherUser) {
    //console.log('EditButton:', userId)
    return (
      <Container style={editButtonStyle}>
        <LGButton
          onPress={() => Actions.chat({ origin: 'Profile', chatmateId: userId })}
          buttonText="msg"
        />
      </Container>
    )
  }
  return (
    <Container style={editButtonStyle}>
      <LGButton
        onPress={() => Actions.profileEdit({ origin: 'Profile' })}
        buttonText="edit"
      />
    </Container>
  )
}
class Profile extends Component {

  render() {
    console.log('Profile.props -->', this.props)
    console.log('Profile.state --> ', this.state)

    const user = getUser(this.props) // This will not work properly, will fix it
    const userId = getUserId(this.props)
    const firstName = user.first_name.toUpperCase()
    const lastName = user.last_name.charAt(0).toUpperCase()
    const age = moment.duration(moment().diff(user.birthday)).years()
    //console.log('Profile.render user:', user)

    const {
      outterContainerStyle,
      nameItemStyle,
      nameTextStyle,
      itemsCenterFlex,
      descriptionTextStyle
    } = styles

    return (
      <Container style={outterContainerStyle}>
        <EditButton forOtherUser={this.props.forOtherUser} userId={userId} />
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
    // height: 20
  },
  imageStyle: {
    marginTop: 30,
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
    width: 300
   },
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    eventFeeds: state.eventFeeds.eventFeeds,
    statistics: state.eventFeeds.statistics
  }
}
export default connect(mapStateToProps)(Profile)
