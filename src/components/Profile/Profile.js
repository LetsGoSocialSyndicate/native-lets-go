/* Copyright 2018, Socializing Syndicate Corp. */
import React, { Component } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import { connect } from 'react-redux'

import { Button, Card, CardSection } from '../common'
import {
  cancelEditing,
  startEditing,
  updateProfile
} from '../../actions/userAction'

const defaultUserpic = require('../../assets/Nina.jpg')

const constructEditButton = (startEditingAction) => (
  <CardSection>
    <Button onPress={startEditingAction}>
      Edit
    </Button>
  </CardSection>
)

const constructSaveCancelButtons = (
  cancelEditingAction,
  updateProfileAction) => {
  return (
    <CardSection>
      <Button onPress={updateProfileAction}>
        Save
      </Button>
      <Button onPress={cancelEditingAction}>
        Cancel
      </Button>
    </CardSection>
)
}

const getUser = (props) => {
  return props.forOtherUser
    ? props.user.otherUser
    : props.user.user
}
const isReadOnly = (props) => {
  return props.forOtherUser || props.user.isReadOnly
}

class Profile extends Component {
  state = {}

  componentDidMount() {
    this.setState({ ...getUser(this.props) })
  }
  render() {
    const user = getUser(this.props)
    const readOnly = isReadOnly(this.props)
    let buttons = null
    if (!this.props.forOtherUser) {
      if (readOnly) {
        buttons = constructEditButton(this.props.startEditingAction)
      } else {
        buttons = constructSaveCancelButtons(
          () => {
            this.props.cancelEditingAction()
            this.setState({ ...getUser(this.props) })
          },
          () => this.props.updateProfileAction(this.state, user, this.props.auth.token))
      }
    }
    return (
      <Card>
        <View style={styles.layoutView}>
          <Image style={styles.image} source={defaultUserpic} />
        </View>
        <View style={styles.layoutView}>
          <Text>{user.first_name} {user.last_name}</Text>
        </View>
        <View style={styles.layoutView}>
          <TextInput
            style={styles.textInputStyle}
            value={this.state.about}
            editable={!readOnly}
            multiline
            numberOfLines={5}
            onChangeText={about => {
              this.setState({ ...this.state, about })
            }}
          />
        </View>
        {buttons}
      </Card>
    )
  }
}

const styles = {
  image: {
    height: 100,
    borderRadius: 50,
    width: 100
  },
  layoutView: {
     justifyContent: 'center',
     alignItems: 'center'
   },
   textInputStyle: {
     borderColor: 'gray',
     borderWidth: 1,
     height: 40,
     width: 100
   },
}

const mapStateToProps = (state) => {
  return { user: state.user, auth: state.auth }
}

const actions = {
  cancelEditingAction: cancelEditing,
  // fetchOtherUserAction: fetchOtherUser,
  startEditingAction: startEditing,
  updateProfileAction: updateProfile
}
export default connect(mapStateToProps, actions)(Profile)
