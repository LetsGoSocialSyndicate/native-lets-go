/*
 * Copyright 2018, Socializing Syndicate Corp.
 */

import React from 'react'
import { reduxForm } from 'redux-form'
import EmailComponent from '../Basic/EmailComponent'
import PasswordComponent from '../Basic/PasswordComponent'

const EMAIL_FIELD = "email"
const PASSWORD_FIELD = "password"

const LoginForm = ({ handleSubmit }) => {
  return (
    <form className="login-form container"
          onSubmit={handleSubmit}
    >
      <EmailComponent labelTitle="Email:" fieldName={EMAIL_FIELD}
        placeholder="" required={true}/>
      <PasswordComponent labelTitle="Password:" fieldName={PASSWORD_FIELD}
        placeholder="" required={true}/>
      <div className="row form-group">
        <button type="submit" className="row btn btn-md submit">Submit</button>
      </div>
    </form>
  )
}

export default reduxForm({form: 'login'})(LoginForm)
