/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
import moment from 'moment'
import { Button, Container, List, ListItem, Spinner, Thumbnail } from 'native-base'
import React, { Component } from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

import { gotoChat } from '../../actions/actionChat'
import { CONTENT_WIDTH, DATETIME_SHORT_FORMAT } from '../common/Constants'
import { getUserpicSource } from '../common/imageUtils'

const darkBackgroundImage = require('../../assets/assets_5.28-06.png')

const hasUnreadMessages = (chatmates, chatmateId) => {
  return chatmateId in chatmates && chatmates[chatmateId].unreadCount > 0
}

const formatLastMessageInfo = item => {
  // return item.lastMessage.snippet
  // const source = item.lastMessage.isIncoming
  //   ? 'last received at' : 'last sent at'
  const timestamp = moment(item.lastMessage.timestamp).format(DATETIME_SHORT_FORMAT)
  // return `${source} ${timestamp}`
  return `${timestamp}`
}

class Conversations extends Component {
  render() {
    const chat = this.props.chat
    // console.log('Conversations::render', chat)
    const {
      containerStyle,
      buttonStyle,
      listItemStyle,
      imageStyle,
      text1Style,
      text2Style,
      column1Style,
      column2Style,
      row1,
      row2
    } = styles

    if (chat.loading) {
      return (
        <Container style={containerStyle}>
          <Spinner color='red' />
        </Container>
      )
    }

    const onPress = (chatmateId) => {
      this.props.gotoChatAction(chatmateId)
      Actions.chat({ origin: 'Conversations', chatmateId })
    }

    const renderRow = item => {
      const actualText1ItemStyle = hasUnreadMessages(chat.chatmates, item._id)
        ? { ...text1Style, fontWeight: 'bold', color: '#6CC7EF' }
        : text1Style
      const actualText2ItemStyle = hasUnreadMessages(chat.chatmates, item._id)
        ? { ...text2Style, fontWeight: 'bold' }
        : text2Style
      const actualImageStyle = hasUnreadMessages(chat.chatmates, item._id)
          ? { ...imageStyle, borderColor: '#6CC7EF' }
          : imageStyle
      const avatar = item.avatar || ''

      return (
        <ListItem style={listItemStyle} avatar>
          <ImageBackground
            source={darkBackgroundImage}
            style={{ width: CONTENT_WIDTH + 30, height: 100, left: -30 }}
          >
            <Button style={buttonStyle} onPress={() => onPress(item._id)}>
              <View style={column1Style}>
                <Thumbnail
                  source={getUserpicSource(avatar)}
                  style={actualImageStyle}
                />
              </View>
              <View style={column2Style}>
                <View style={row1}>
                  <Text style={actualText1ItemStyle}>{item.name}</Text>
                </View>
                <View style={row2}>
                  <Text style={actualText2ItemStyle}>{formatLastMessageInfo(item)}</Text>
                </View>
              </View>
            </Button>
          </ImageBackground>
        </ListItem>
      )
    }
    // console.log('chat.chatmates', chat.chatmates)
    const chatmates = Object.values(chat.chatmates)
      // Drop chatmates which have no messages
      .filter(chatmate => Boolean(chatmate.lastMessage))
      // Sort by last message time, newer first.
      .sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp)
    if (chatmates.length === 0) {
      return (
        <Text style={styles.noChatTextStyle}>
          There are no messages or requests to join my activities
        </Text>
      )
    }
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
    marginTop: 1,
    flexDirection: 'row',
  },
  column1Style: {
    flex: 1,
    height: 100,
    alignItems: 'center',
    paddingLeft: 30,
    paddingTop: 37,
    flexDirection: 'column',
  },
  column2Style: {
    flex: 3,
    height: 100,
    paddingLeft: 30,
    paddingTop: 40,
  },
  row1: {
    marginBottom: 2
  },
  row2: {
    borderColor: 'orange'
  },
  imageStyle: {
    height: 80,
    borderRadius: 40,
    width: 80,
    borderColor: 'white',
    borderWidth: 5
  },
  text1Style: {
    color: '#fff',
    fontSize: 23,
    letterSpacing: 2
  },
  text2Style: {
    color: '#fff',
    fontSize: 20
  },
  noChatTextStyle: {
    color: '#FFF',
    letterSpacing: 2,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 40
  }
}

const mapStateToProps = (state) => {
  return { chat: state.chat, user: state.user.user }
}
const actions = {
  gotoChatAction: gotoChat
}
export default connect(mapStateToProps, actions)(Conversations)
