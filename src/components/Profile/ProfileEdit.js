/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
import { Image, View } from 'react-native'
import { Container } from 'native-base'
import ProfileEditForm from './ProfileEditForm'
import { CONTENT_HEIGHT } from '../common/Constants'

//TODO: change later to real DONE icon
const doneButton = require('../../assets/buttons/submit.png')
const defaultUser = require('../../assets/default.png')

const Profile = () => {
  const {
    outterContainerStyle,
    itemsCenterFlex,
    imageContainerStyle,
    image
  } = styles

  return (
    <Container style={outterContainerStyle}>
      <View style={itemsCenterFlex}>
        <Container style={imageContainerStyle}>
          <Image
            source={defaultUser}
            style={image}
          />
        </Container>
        <ProfileEditForm />
      </View>
    </Container>
  )
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
  image: {
    height: 100,
    borderRadius: 50,
    width: 100,
    borderColor: 'white',
    borderWidth: 8
  },
  imageContainerStyle: {
    marginTop: 50,
    backgroundColor: 'transparent',
  }
}

export default Profile
