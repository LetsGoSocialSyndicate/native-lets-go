/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import React from 'react'
 import { Actions } from 'react-native-router-flux'
 import { connect } from 'react-redux'

 import { Button, Card, CardSection } from '../common'
 import { logout } from '../../actions/authAction'

const EventFeeds = ({ logoutAction }) => {
  return (
    <Card>
      <CardSection>
        <Button onPress={() => Actions.profile({ forOtherUser: false })}>
          Profile
        </Button>
      </CardSection>
      <CardSection>
        <Button onPress={logoutAction}>
          Logout
        </Button>
      </CardSection>
    </Card>
  )
}

const actions = {
  logoutAction: logout,
}
export default connect(null, actions)(EventFeeds)
