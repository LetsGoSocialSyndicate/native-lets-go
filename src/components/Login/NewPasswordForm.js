/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Card, CardSection, Error, TextInputFormField, LoadingButton } from '../common'

export const VERIFICATION_CODE = 'VERIFICATION_CODE'
export const PASSWORD_FIELD = 'password'
export const PASSWORD2_FIELD = 'confirmPassword'

const NewPasswordForm = ({ handleSubmit, auth }) => {
   return (
     <Card>
       <CardSection>
          <TextInputFormField
            name={VERIFICATION_CODE}
            label='Verification Code'
          />
       </CardSection>
       <CardSection>
          <TextInputFormField
            name={PASSWORD_FIELD}
            secureTextEntry
            label='Password'
          />
       </CardSection>
       <CardSection>
          <TextInputFormField
            name={PASSWORD2_FIELD}
            secureTextEntry
            label='Confirm password'
          />
       </CardSection>
       <Error error={auth.error} />
       <CardSection>
         <LoadingButton loading={auth.loading} onPress={handleSubmit}>
           Verify
         </LoadingButton>
       </CardSection>
     </Card>
    )
  }

  const mapStateToProps = (state) => {
    return { auth: state.auth }
  }
  export default connect(mapStateToProps)(reduxForm({ form: 'newPassword' })(NewPasswordForm))
