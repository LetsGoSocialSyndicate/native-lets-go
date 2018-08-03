/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
//Tanya - DEBUG: comment this out
//import { REACT_AUTO_LOGIN_USER, REACT_AUTO_LOGIN_PASSWORD } from 'react-native-dotenv'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Icon, Item, Form } from 'native-base'
import { Image, View } from 'react-native'

import { Error, TextInputFormField } from '../common'
import LoadingButton from '../common/LoadingButton'

//Tanya - DEBUG: uncomment this
const REACT_AUTO_LOGIN_USER = 'panich.photos3@gmail.com'
const REACT_AUTO_LOGIN_PASSWORD = '123'

const EMAIL_FIELD = 'email'
const PASSWORD_FIELD = 'password'
const submitButton = require('../../assets/buttons/submit.png')
const userpicIcon = require('../../assets/loginIcons/userpic.png')
const passwordIcon = require('../../assets/loginIcons/password.png')

// DEBUG: For faster login
const initialValues = () => {
  return REACT_AUTO_LOGIN_USER && REACT_AUTO_LOGIN_PASSWORD ?
  {
    [EMAIL_FIELD]: REACT_AUTO_LOGIN_USER,
    [PASSWORD_FIELD]: REACT_AUTO_LOGIN_PASSWORD
  }
  : {}
}

const LoginForm = ({ handleSubmit, auth }) => {
  const {
    formStyle,
    itemStyle,
    buttonSubmitStyle,
    iconStyle
  } = styles

  return (
    <Form style={formStyle}>
      <Item style={itemStyle}>
        <Image source={userpicIcon} style={iconStyle} />
        <TextInputFormField
          name={EMAIL_FIELD}
          placeholder='email'
        />
      </Item>
      <Item style={itemStyle}>
        <Image source={passwordIcon} style={iconStyle} />
        <TextInputFormField
          name={PASSWORD_FIELD}
          secureTextEntry
          placeholder='password'
        />
      </Item>

      <Error error={auth.error} />

      <LoadingButton
        style={buttonSubmitStyle}
        transparent
        loading={auth.loading}
        onPress={handleSubmit}
        source={submitButton}
      />
    </Form>
  )
}

const styles = {
  buttonSubmitStyle: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginTop: 35,
  },
  formStyle: {
    // height: 240,
  },
  itemStyle: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20
  },
  iconStyle: {
    padding: 5,
    height: 40,
    width: 40,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}
export default connect(mapStateToProps)(reduxForm({
  form: 'login', initialValues: initialValues()
})(LoginForm))
