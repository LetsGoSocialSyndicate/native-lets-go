import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Header } from './components/common'

class App extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText={'Let\'s Go, The App'} />
        <Text>Lets Go, The App</Text>
      </View>
    )
  }
}

export default App
