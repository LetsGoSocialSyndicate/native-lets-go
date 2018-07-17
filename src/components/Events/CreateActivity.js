/* Copyright 2018, Socializing Syndicate Corp. */
import React from 'react'
// import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import { Form, Item } from 'native-base'
// import { reduxForm } from 'redux-form'
// import ModalDropdown from 'react-native-modal-dropdown'
// import LoadingButton from '../common'
import { LoadingButton, TextInputFormField } from '../common'
// import ACTIVITY_CATEGORIES from '../common/Constants'

const CreateActivity = () => {
  const { buttonSubmitStyle, formStyle, itemStyle } = styles
    return (
// testing view
      <View>
        <Text>EmployeeList</Text>
        <Text>EmployeeList</Text>
        <Text>EmployeeList</Text>
        <Text>EmployeeList</Text>
        <Text>EmployeeList</Text>
        <Text>EmployeeList</Text>
      </View>

    )
  }

const styles = {
  buttonSubmitStyle: {
    width: 150,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
  },
  formStyle: {
    height: 240,
  },
  itemStyle: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20
  }
}

export default CreateActivity
