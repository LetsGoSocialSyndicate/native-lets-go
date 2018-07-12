// /* Copyright 2018, Socializing Syndicate Corp. */
// import React from 'react'
// //import { REACT_AUTO_LOGIN_USER, REACT_AUTO_LOGIN_PASSWORD } from 'react-native-dotenv'
// import { connect } from 'react-redux'
// import { reduxForm } from 'redux-form'
//
// import {
//   Card,
//   CardSection,
//   Error,
//   TextInputFormField,
//   LoadingButton
// } from '../common'
//
// // TODO: Temporary, instead react-native-dotenv
// const REACT_AUTO_LOGIN_USER = 'panich.photos3@gmail.com'
// const REACT_AUTO_LOGIN_PASSWORD = '123'
//
// const EMAIL_FIELD = 'email'
// const PASSWORD_FIELD = 'password'
//
// // DEBUG: For faster login
// const initialValues = () => {
//   return REACT_AUTO_LOGIN_USER && REACT_AUTO_LOGIN_PASSWORD ?
//   {
//     [EMAIL_FIELD]: REACT_AUTO_LOGIN_USER,
//     [PASSWORD_FIELD]: REACT_AUTO_LOGIN_PASSWORD
//   }
//   : {}
// }
//
// const LoginForm = ({ handleSubmit, auth }) => {
//   return (
//     <Card>
//       <CardSection>
//         <TextInputFormField
//           name={EMAIL_FIELD}
//           label='Email'
//           placeholder='email@gmail.com'
//         />
//       </CardSection>
//       <CardSection>
//         <TextInputFormField
//           name={PASSWORD_FIELD}
//           secureTextEntry
//           label='Password'
//           placeholder='password'
//         />
//       </CardSection>
//       <Error error={auth.error} />
//       <CardSection>
//         <LoadingButton loading={auth.loading} onPress={handleSubmit}>
//           Login
//         </LoadingButton>
//       </CardSection>
//     </Card>
//   )
// }
//
// const mapStateToProps = (state) => {
//   return { auth: state.auth }
// }
// export default connect(mapStateToProps)(reduxForm({
//   form: 'login', initialValues: initialValues()
// })(LoginForm))
