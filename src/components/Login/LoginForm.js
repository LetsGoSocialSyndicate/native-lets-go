/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Card, CardSection, Error, TextInputFormField, LoadingButton } from '../common'

const EMAIL_FIELD = 'email'
const PASSWORD_FIELD = 'password'

const LoginForm = ({ handleSubmit, auth }) => {
  return (
    <Card>
      <CardSection>
        <TextInputFormField
          name={EMAIL_FIELD}
          label='Email'
          placeholder='email@gmail.com'
        />
      </CardSection>
      <CardSection>
        <TextInputFormField
          name={PASSWORD_FIELD}
          secureTextEntry
          label='Password'
          placeholder='password'
        />
      </CardSection>
      <Error error={auth.error} />
      <CardSection>
        <LoadingButton loading={auth.loading} onPress={handleSubmit}>
          Login
        </LoadingButton>
      </CardSection>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}
export default connect(mapStateToProps)(reduxForm({ form: 'login' })(LoginForm))
