/* Copyright 2018, Socializing Syndicate Corp. */
//import moment from 'moment'
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { Form, Item, H3 } from 'native-base'
import {
  DateTimePickerInputFormField,
  Error,
  TextInputFormField,
  PickerSelectInputFormField,
  GenericTextInputFormField
} from '../common'
import LoadingButton from '../common/LoadingButton'
import { activityCategoriesKV, getActivityImage } from '../common/imageUtils'

const submitButton = require('../../assets/buttons/submit.png')
const category = require('../../assets/createActivity/category.png')
const start = require('../../assets/createActivity/start.png')
const end = require('../../assets/createActivity/end.png')

// NOTE: The field name (i.e. values of these constants)
//       need to match server side fields (routes/events.js, POST).
const HEADLINE_FIELD = 'title'
const LOCATION_FIELD = 'location'
const CATEGORY_FIELD = 'category'
const ACTIVITY_START_TIME_FIELD = 'start_time'
const ACTIVITY_END_TIME_FIELD = 'end_time'
const DESCRIPTION_FIELD = 'description'

const TODAY = new Date()
const TODAY_PLUS_3 = new Date(TODAY.getTime() + (1000 * 60 * 60 * 72))
const TODAY_PLUS_3_END = new Date(TODAY.getTime() + (1000 * 60 * 60 * 84))

class CreateActivityForm extends Component {
  state = {
    categoryImageSource: null
  }
  render() {
    const {
      buttonSubmitStyle,
      formStyle,
      itemStyle,
      outterStile,
      innerStyle,
      timeItemStyle,
      timeTitleItemStyle,
      timeTitlesStyle,
      h3Style,
      iconStyle,
      descriptionTextStyle
    } = styles

    const categoryImage = this.state.categoryImageSource
      ? (<Image
          source={this.state.categoryImageSource}
          style={iconStyle}
      />)
      : null

    return (
    <Form style={formStyle}>
      <Item style={itemStyle}>
        <TextInputFormField
          name={HEADLINE_FIELD}
          placeholder='headline'
        />
      </Item>

      <Item style={itemStyle}>
        <TextInputFormField
          name={LOCATION_FIELD}
          placeholder='location'
        />
      </Item>

      {/* <Item style={timeTitleItemStyle}> */}
        <Image
            source={category}
            style={timeTitlesStyle}
        />
      {/* </Item> */}

      <PickerSelectInputFormField
        name={CATEGORY_FIELD}
        placeholder={{ label: 'select category', value: null }}
        // hideIcon
        items={activityCategoriesKV}
        onValueChange={(value) => {
          this.setState({
            ...this.state,
            categoryImageSource: getActivityImage(value)
          })
        }}
      />

      {categoryImage}

      <GenericTextInputFormField
        name={DESCRIPTION_FIELD}
        placeholder='describe the event...'
        autoCapitalize='none'
        style={descriptionTextStyle}
        multiline
        maxLength={200}
      />

      <Item style={outterStile}>
        <Item style={innerStyle}>
          <Item style={timeTitleItemStyle}>
            <Image
                source={start}
                style={timeTitlesStyle}
            />
            {/* <H3 style={h3Style}>start</H3> */}
          </Item>
          <Item style={timeItemStyle}>
            <DateTimePickerInputFormField
              name={ACTIVITY_START_TIME_FIELD}
              placeholder='start time'
              minDate={TODAY}
              maxDate={TODAY_PLUS_3}
            />
          </Item>
        </Item>

        <Item style={innerStyle}>
          <Item style={timeTitleItemStyle}>
            <Image
                source={end}
                style={timeTitlesStyle}
            />
            {/* <H3 style={h3Style}>end</H3> */}
          </Item>
          <Item style={timeItemStyle}>
            <DateTimePickerInputFormField
              name={ACTIVITY_END_TIME_FIELD}
              placeholder='end time'
              minDate={TODAY}
              maxDate={TODAY_PLUS_3_END}
            />
          </Item>
        </Item>
      </Item>

      <Error error={this.props.eventFeeds.error} />

      <LoadingButton
        loading={this.props.eventFeeds.isLoading}
        onPress={this.props.handleSubmit}
        style={buttonSubmitStyle}
        source={submitButton}
        transparent
      />
    </Form>)
  }
}

const styles = {
  buttonSubmitStyle: {
    width: 150,
    height: 80,
    alignSelf: 'center',
    marginTop: 10
  },
  formStyle: {
    marginTop: 35,
    height: 60
  },
  itemStyle: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10
  },
  outterStile: {
    borderBottomWidth: 0,
    marginLeft: 30,
    marginRight: 30,
    flexDirection: 'column'
  },
  innerStyle: {
    borderBottomWidth: 0
  },
  timeTitleItemStyle: {
    flex: 1,
    borderBottomWidth: 0,
    paddingLeft: 0
  },
  timeTitlesStyle: {
    //padding: 5,
    height: 30,
    width: 80,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  timeItemStyle: {
    // marginLeft: 0,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 20,
    marginLeft: 30,
    marginTop: 10,
    flex: 3
  },
  pickerItemStyle: {
    color: 'red'
  },
  iconStyle: {
    height: 32,
    width: 90,
    resizeMode: 'center',
  },
  descriptionTextStyle: {
     marginTop: 20,
     paddingTop: 10,
     paddingBottom: 10,
     paddingLeft: 20,
     paddingRight: 20,
     fontSize: 18,
     // color: 'white',
     backgroundColor: '#fff',
     borderRadius: 15,
     width: 300,
     height: 80
   },
}

const mapStateToProps = (state) => {
  return { eventFeeds: state.eventFeeds }
}
export default connect(mapStateToProps)(
  reduxForm({ form: 'createActivityForm' }
)(CreateActivityForm))
