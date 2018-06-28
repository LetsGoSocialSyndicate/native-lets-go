/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import React from 'react'
 import { reduxForm } from 'redux-form'
 import { connect } from 'react-redux'
 import { Card, CardSection, Error, TextInputFormField, LoadingButton } from '../common'

 export const VERIFICATION_CODE = 'VERIFICATION_CODE'

const SignupForm = ({ handleSubmit, auth }) => {
   return (
     <Card>
       <CardSection>
          <TextInputFormField
            name={VERIFICATION_CODE}
            label='Verification Code'
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
  export default connect(mapStateToProps)(reduxForm({ form: 'signup' })(SignupForm))
