import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Spinner = ({ spinnerSize }) => {
  const { containerStyle } = styles
  return (
    <View style={ containerStyle }>
      <ActivityIndicator size={ spinnerSize || 'large' }/>
    </View>
  )
}

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
export { Spinner }
