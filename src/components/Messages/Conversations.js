/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 /* eslint-disable no-underscore-dangle */
import moment from 'moment'
import React, { Component } from 'react'
import { Button, Container, List, ListItem, Spinner, Thumbnail } from 'native-base'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { View, ImageBackground, Text } from 'react-native'
import { gotoChat } from '../../actions/actionChat'
import { CONTENT_WIDTH, DATETIME_SHORT_FORMAT } from '../common/Constants'

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
    console.log('Conversations::render', chat)
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
      Actions.chat({ chatmateId })
    }

    const renderRow = item => {
      const actualListItemStyle = hasUnreadMessages(chat.chatmates, item._id)
        ? { ...listItemStyle, borderColor: 'black' }
        : listItemStyle
      return (
        <ListItem style={actualListItemStyle} avatar>
          <ImageBackground
            source={darkBackgroundImage}
            style={{ width: CONTENT_WIDTH + 30, height: 100, left: -30 }}
          >
            <Button style={buttonStyle} onPress={() => onPress(item._id)}>
              {/* <View style={categoryParentStyle}> */}
                <View style={column1Style}>
                  <Thumbnail
                    source={{ uri: item.avatar }}
                    style={imageStyle}
                  />
                </View>
                <View style={column2Style}>
                  <View style={row1}>
                    <Text style={text1Style}>{item.name}</Text>
                  </View>
                  <View style={row2}>
                    <Text style={text2Style}>{formatLastMessageInfo(item)}</Text>
                  </View>
                </View>
              {/* </View> */}
            </Button>
          </ImageBackground>
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
    marginTop: 1,
    flexDirection: 'row',
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderColor: 'tomato',
  },
  categoryParentStyle: {
   // borderBottomWidth: 1,
   // borderTopWidth: 1,
   // borderLeftWidth: 1,
   // borderRightWidth: 1,
   // borderColor: 'tomato',
   // height: 100,
   // marginTop: 7
  },
  column1Style: {
   flex: 1,
   height: 100,
   alignItems: 'center',

   paddingLeft: 30,
   paddingTop: 37,
   flexDirection: 'column',
   // borderBottomWidth: 1,
   // borderTopWidth: 1,
   // borderLeftWidth: 1,
   // borderRightWidth: 1,
   // borderColor: 'blue'
   // borderBottomWidth: 0,
   // paddingLeft: 10
  },
  column2Style: {
   flex: 3,
   height: 100,
   paddingLeft: 30,
   paddingTop: 40,
   // borderBottomWidth: 1,
   // borderTopWidth: 1,
   // borderLeftWidth: 1,
   // borderRightWidth: 1,
   // borderColor: 'green'
 },
 row1: {
   // borderBottomWidth: 1,
   // borderTopWidth: 1,
   // borderLeftWidth: 1,
   // borderRightWidth: 1,
   // borderColor: 'magenta',
   marginBottom: 2
 },
 row2: {
   // borderBottomWidth: 1,
   // borderTopWidth: 1,
   // borderLeftWidth: 1,
   // borderRightWidth: 1,
   borderColor: 'orange'
   // marginRight: 10
 },
 imageStyle: {
   //marginTop: 30,
   height: 80,
   borderRadius: 40,
   width: 80,
   borderColor: 'white',
   borderWidth: 5
 },
  text1Style: {
    //marginLeft: 20
    color: '#fff',
    fontSize: 23,
    letterSpacing: 2
  },
  text2Style: {
    color: '#fff',
    fontSize: 20
  }
}

const mapStateToProps = (state) => {
  return { chat: state.chat, user: state.user.user }
}
const actions = {
  gotoChatAction: gotoChat
}
export default connect(mapStateToProps, actions)(Conversations)
