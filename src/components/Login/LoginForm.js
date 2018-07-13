/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
//import { REACT_AUTO_LOGIN_USER, REACT_AUTO_LOGIN_PASSWORD } from 'react-native-dotenv'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import {
  Item,
  Form,
  Icon,
  Button,
  Text
} from 'native-base'

import {
  Error,
  TextInputFormField,
  // LoadingButton
} from '../common'

// TODO: Temporary, instead react-native-dotenv
const REACT_AUTO_LOGIN_USER = 'panich.photos3@gmail.com'
const REACT_AUTO_LOGIN_PASSWORD = '123'

const EMAIL_FIELD = 'email'
const PASSWORD_FIELD = 'password'

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
    textStyleSubmit,
    formStyle,
    itemStyle
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
          placeholder='password'
        />
      </Item>

      <Error error={auth.error} />

      {/* TODO: need to add loading functionality: */}
      <Button
        // loading={auth.loading}
        onPress={handleSubmit}
        style={buttonSubmitStyle}
        block
        rounded
      >
        <Text style={textStyleSubmit}>
          submit
        </Text>
      </Button>
    </Form>
  )
}

const styles = {
  buttonSubmitStyle: {
    marginTop: 20,
    marginBottom: 70,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#4380B0',
    alignSelf: 'center',
  },
  textStyleSubmit: {
    letterSpacing: 3,
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
