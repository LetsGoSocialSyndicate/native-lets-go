// /*
//  * Copyright 2018, Socializing Syndicate Corp.
//  */
// import React from 'react'
// import { connect } from 'react-redux'
// // import { signupSubmit, setSignupError } from '../../actions/authAction'
// import ProfileEditForm from './ProfileEditForm'
//
// class ProfileEdit extends Component {
//
//   buildImageRequest() {
//     // For now returning array of 1 - we allow only 1 profile userpic
//     return [{
//        op: this.state.profileImageOp,
//        id: getUserpicId(this.state.user),
//        image_url: this.state.currentImageUrl
//     }]
//   }
//
//   constructSaveCancelButtons() {
//     const originalUser = getUser(this.props)
//
//     //this is Done button
//     const onSave = () => {
//       let imageRequest = []
//       if (this.state.profileImageOp !== IMAGE_OP_NONE) {
//         imageRequest = this.buildImageRequest()
//       }
//       this.props.updateProfileAction(
//         this.state.user, originalUser.id, this.props.auth.token, imageRequest)
//       .then(() => {
//         // After the server update completes we need to update
//         // internal state with fetched user data.
//         const updatedUser = getUser(this.props)
//         this.setState({
//           ...this.state,
//           user: updatedUser,
//           currentImageUrl: getUserpic(updatedUser),
//           profileImageOp: IMAGE_OP_NONE
//         })
//       })
//     }
//   const action = () => {}
//   return (<ProfileEditForm onSubmit={action} />)
// }
//
// const actions = {
//
// }
// export default connect(null, actions)(ProfileEdit)
