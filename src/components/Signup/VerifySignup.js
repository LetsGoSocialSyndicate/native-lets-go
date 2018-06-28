/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import React from 'react'
 import { Text } from 'react-native'
 import { connect } from 'react-redux'
 import { verifyCode } from '../../actions/authAction'
 import { Card, CardSection } from '../common'
 import VerifySignupForm, { VERIFICATION_CODE } from './VerifySignupForm'

 const VerifySignup = ({ auth, verifyCodeAction }) => {
   if (!auth.email) {
     return (
       <Card>
         <CardSection>
           <Text>Something went wrong - email is undefined.</Text>
         </CardSection>
       </Card>
     )
   }
   const action = (fields) => verifyCodeAction(fields[VERIFICATION_CODE], auth.email)
   return (
     <Card>
       <CardSection>
         <Text>Please check {auth.email} for a verification code:</Text>
       </CardSection>
       <VerifySignupForm onSubmit={action} />
     </Card>
   )
 }

 const mapStateToProps = (state) => {
   return {
     auth: state.auth
   }
 }
 const actions = {
   verifyCodeAction: verifyCode,
 }
 export default connect(mapStateToProps, actions)(VerifySignup)
