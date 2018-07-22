/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
import moment from 'moment'
import React, { Component } from 'react'
import { Button, Container, List, ListItem, Spinner, Thumbnail } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import { gotoChat } from '../../actions/actionChat'
import { DATETIME_SHORT_FORMAT } from '../common/Constants'

const hasUnreadMessages = (chatmates, chatmateId) => {
  return chatmateId in chatmates && chatmates[chatmateId].unreadCount > 0
}

const formatLastMessageInfo = item => {
  // return item.lastMessage.snippet
  const source = item.lastMessage.isIncoming
    ? 'last received at' : 'last sent at'
  const timestamp = moment(item.lastMessage.timestamp).format(DATETIME_SHORT_FORMAT)
  return `${source} ${timestamp}`
}

class Conversations extends Component {
  render() {
    const chat = this.props.chat
    console.log('Conversations::render', chat)
    const { containerStyle, buttonStyle, listItemStyle, textStyle } = styles
    if (chat.loading) {
      return (
        <Container style={containerStyle}>
          <Spinner color='red' />
        </Container>
      )
    }

    const onPress = (chatmateId) => {
      this.props.gotoChatAction(chatmateId)
      Actions.chat({ chatmateId })
    }

    const renderRow = item => {
      const actualListItemStyle = hasUnreadMessages(chat.chatmates, item._id)
        ? { ...listItemStyle, borderColor: 'black' }
        : listItemStyle
      return (
        <ListItem style={actualListItemStyle} avatar>
          <Button style={buttonStyle} onPress={() => onPress(item._id)}>
            <Thumbnail source={{ uri: item.avatar }} />
            <Text style={textStyle}>{item.name}</Text>
            <Text style={textStyle}>{formatLastMessageInfo(item)}</Text>
          </Button>
        </ListItem>
      )
    }
    console.log('chat.chatmates', chat.chatmates)
    const chatmates = Object.values(chat.chatmates).sort(
      (a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp
    )
    return (
      <Container style={containerStyle}>
        <List
          dataArray={chatmates}
          renderRow={renderRow}
        />
      </Container>
    )
  }
}

const styles = {
  containerStyle: {
    backgroundColor: 'transparent',
    marginTop: 30
  },
  buttonStyle: {
    backgroundColor: 'transparent',
  },
  listItemStyle: {
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  textStyle: {
    marginLeft: 20
  }
}

const mapStateToProps = (state) => {
  return { chat: state.chat, user: state.user.user }
}
const actions = {
  gotoChatAction: gotoChat
}
export default connect(mapStateToProps, actions)(Conversations)
