/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
//import { REACT_AUTO_LOGIN_USER, REACT_AUTO_LOGIN_PASSWORD } from 'react-native-dotenv'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Image, TouchableHighlight } from 'react-native'
import {
  Item,
  Form,
  Icon,
} from 'native-base'
import {
  Error,
  TextInputFormField,
  ImageButton,
  // LoadingButton
} from '../common'

// TODO: Temporary, instead react-native-dotenv
const REACT_AUTO_LOGIN_USER = 'sukmi.ledru@gmail.com'
const REACT_AUTO_LOGIN_PASSWORD = 'Aa123456'

const EMAIL_FIELD = 'email'
const PASSWORD_FIELD = 'password'
const submitButton = require('../../assets/buttons/submit.png')

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
    buttonSubmitStyle,
    formStyle,
    itemStyle,
  } = styles

  return (
    <Form style={formStyle}>
      <Item style={itemStyle}>
        <Icon active name='lock' />
        <TextInputFormField
          name={EMAIL_FIELD}
          placeholder='email'
        />
      </Item>
      <Item style={itemStyle}>
        <Icon active name='lock' />
        <TextInputFormField
          name={PASSWORD_FIELD}
          secureTextEntry
          placeholder='password'
        />
      </Item>

      <Error error={auth.error} />

      {/* TODO: need to add loading functionality: */}

      <ImageButton handleOnPress={ handleSubmit }
        buttonSource={ submitButton }/>
    </Form>
  )
}

const styles = {
  buttonSubmitStyle: {
    resizeMode: 'contain',
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginTop: 20
  },
  formStyle: {
    height: 30
  },
  itemStyle: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}
export default connect(mapStateToProps)(reduxForm({
  form: 'login', initialValues: initialValues()
})(LoginForm))
