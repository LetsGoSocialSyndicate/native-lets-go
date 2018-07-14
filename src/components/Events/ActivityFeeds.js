/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { ScrollView } from 'react-native'
import { List, ListItem } from 'native-base'
import ActivityFeed from './ActivityFeed'
import { fetchEventFeeds } from '../../actions/actionFeeds'
import { logout } from '../../actions/authAction'

class ActivityFeeds extends Component {
  componentWillMount() {
    this.props.fetchEventFeeds(this.props.token)
  }

  renderActivityFeeds() {
    return (
      Object.values(this.props.eventFeeds)
        .map((event) => {
          return <ActivityFeed activity={ event } key={ event.event_id }/>
        })
    )
  }

  render() {
    const {
      containerStyle, contentStyle
    } = styles
    const items = Object.values(this.props.eventFeeds)
    return (
      <ScrollView>
        <List dataArray={items}
          renderRow={(item) =>
            <ListItem>
              <ActivityFeed activity={ item } />
            </ListItem>
          }>
        </List>
      </ScrollView>
    )
  }
}

const styles = {
  containerStyle: {
    backgroundColor: 'transparent'
  },
  contentStyle: {
    backgroundColor: 'transparent'
  },
  buttonsContainer: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 50
  },
  titleStyle: {
    width: null,
    resizeMode: 'contain',
    height: 40
  },
  titleContainerStyle: {
    marginTop: 100,
    marginBottom: 60,
  }
}

const mapStateToProps =  (state) => ({ ...state.eventFeeds, ...state.user, ...state.auth })

const dispatchToProps = (dispatch) => bindActionCreators({
  fetchEventFeeds,
  logoutAction: logout
}, dispatch)

export default connect(mapStateToProps, dispatchToProps)(ActivityFeeds)


/*
<Container>
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
</Container>
*/
