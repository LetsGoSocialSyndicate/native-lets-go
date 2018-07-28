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
  Spinner,
  Text,
  Thumbnail
} from 'native-base'
import { LGButton } from '../common'
import { CONTENT_HEIGHT } from '../common/Constants'
import ProfileActivitiesContainer from './ProfileActivitiesContainer'
import Moments from './Moments'

class UserWrapper {
  constructor(props) {
    this.forOtherUser = props.forOtherUser
    // WARNING: this.props.user and this.props.otherUserInfo have different
    // structure!
    this.user = props.forOtherUser ? props.otherUserInfo : props.user.user
  }
  isEmpty() {
    return !this.user
  }
  isOtherUser() {
    return this.forOtherUser
  }
  getId() {
    return this.forOtherUser ? this.user.user_id : this.user.id
  }
  getUserpic() {
    if (this.forOtherUser) {
      return this.user.user_image_url
    }
    return 'images' in this.user && this.user.images.length > 0
      ? this.user.images[0].image_url
      : ''
  }
  getAbout() {
    return this.forOtherUser ? this.user.user_about : this.user.about
  }
  getFirstName() {
    return this.user.first_name
  }
  getLastName() {
    return this.user.last_name
  }
  getBirthday() {
    return this.user.birthday
  }
  getEmail() {
    return this.user.email
  }
}

const ImageView = ({ imageUrl }) => {
  const source = imageUrl ? { uri: imageUrl } : null
  return (
    <View>
      <Image style={styles.imageStyle} source={source} />
    </View>
  )
}

class Profile extends Component {

  renderEditButton(user, style) {
    if (user.isOtherUser()) {
      return null
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
  renderMessageButton(user, style) {
    if (!user.isOtherUser()) {
      return null
    }
    return (
      <Container style={style}>
        <LGButton
          onPress={() => Actions.chat({ origin: 'Profile', chatmateId: user.getId() })}
          buttonText="message"
        />
      </Container>
    )
  }

  render() {
    console.log('Profile.render:', this.props)
    const user = new UserWrapper(this.props)
    if (user.isEmpty()) {
      return (
        <Container style={styles.outterContainerStyle}>
          <Spinner color='red' />
        </Container>
      )
    }

    const userpic = user.getUserpic()
    const about = user.getAbout()
    const firstName = user.getFirstName().toUpperCase()
    const lastName = user.getLastName().charAt(0).toUpperCase()
    const age = moment.duration(moment().diff(user.getBirthday())).years()

    return (
      <ScrollView style={styles.outterContainerStyle}>
        <View style={styles.itemsCenterFlex}>
          <ImageView imageUrl={userpic} />

          <Item style={styles.nameItemStyle}>
            <Text style={styles.nameTextStyle}>
              {firstName} {lastName}, {age}
            </Text>
          </Item>

          <TextInput
            style={styles.descriptionTextStyle}
            value={about}
            editable={false}
            multiline
          />

          {this.renderEditButton(user, styles.editButtonStyle)}
          {this.renderMessageButton(user, styles.messageButtonStyle)}

        </View>
        <ProfileActivitiesContainer userWrapper={user} userpic={userpic} />
        <Moments userWrapper={user} />
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
    marginBottom: 50
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
   }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Profile)
