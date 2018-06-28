/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import React from 'react'
 import { reduxForm } from 'redux-form'
 import { connect } from 'react-redux'
 import { Card, CardSection, Error, TextInputFormField, LoadingButton } from '../common'

 export const EMAIL_FIELD = 'email'

const ForgotPasswordForm = ({ handleSubmit, auth }) => {
   return (
     <Card>
       <CardSection>
          <TextInputFormField
            name={EMAIL_FIELD}
            label='Please enter your email'
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
  export default connect(mapStateToProps)(reduxForm({ form: 'forgotPassword' })(ForgotPasswordForm))
