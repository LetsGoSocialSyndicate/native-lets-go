/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import React from 'react'
 import { Text } from 'react-native'
 import { Item, Form, H1 } from 'native-base'
 import { connect } from 'react-redux'
 import { verifyCode } from '../../actions/authAction'
 import VerifySignupForm, { VERIFICATION_CODE } from './VerifySignupForm'

 const VerifySignup = ({ auth, verifyCodeAction }) => {
   const {
    formStyle,
    itemStyle,
    verificationTextStyle,
    h1Style
   } = styles
   if (!auth.email) {
     return (
       <Form style={formStyle}>
         <Item style={itemStyle}>
           <Text>Something went wrong - email is undefined.</Text>
         </Item>
       </Form>
     )
   }
   const action = (fields) => verifyCodeAction(fields[VERIFICATION_CODE], auth.email)
   return (
     <Form style={formStyle}>
       <H1 style={h1Style}>SIGNUP - email verification</H1>
         <Text style={verificationTextStyle}>
           Please check {auth.email} for a verification code:
         </Text>
       <VerifySignupForm onSubmit={action} />
     </Form>
   )
 }
 const styles = {
   formStyle: {
     marginTop: 10,
     height: 400
   },
   h1Style: {
     marginTop: 30,
     color: 'white',
     textAlign: 'center',
   },
   itemStyle: {
     marginLeft: 50,
     marginRight: 50,
     borderBottomWidth: 0,
   },
   verificationTextStyle: {
     marginTop: 30,
     marginLeft: 50,
     marginRight: 50,
     textAlign: 'center',
     paddingTop: 10,
     paddingBottom: 10,
     paddingLeft: 20,
     paddingRight: 20,
     fontSize: 20,
     color: 'white',
     height: 80,
     width: 300,
   },
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
