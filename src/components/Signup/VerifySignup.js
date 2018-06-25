/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import React from 'react'
 import { connect } from 'react-redux'

 const VerifySignup = ({ auth }) => {
   return null
 }

 const mapStateToProps = (state) => {
   return {
     auth: state.auth
   }
 }
 export default connect(mapStateToProps)(VerifySignup)
