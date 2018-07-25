/* Copyright 2018, Socializing Syndicate Corp. */
//import moment from 'moment'
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Image } from 'react-native'
import { Form, Item } from 'native-base'
import {
  DateTimePickerInputFormField,
  Error,
  TextInputFormField,
  PickerSelectInputFormField,
  GenericTextInputFormField
} from '../common'
import LoadingButton from '../common/LoadingButton'
import { activityCategoriesKV, getActivityImage } from '../common/imageUtils'

const submitButton = require('../../assets/buttons/done.png')
const category = require('../../assets/createActivity/category.png')
const defaultActivity = require('../../assets/createActivity/defaultActivity.png')
const start = require('../../assets/createActivity/start.png')
const end = require('../../assets/createActivity/end.png')

// NOTE: The field name (i.e. values of these constants)
//       need to match server side fields (routes/events.js, POST).
export const HEADLINE_FIELD = 'title'
export const LOCATION_FIELD = 'location'
export const CATEGORY_FIELD = 'category'
export const ACTIVITY_START_TIME_FIELD = 'start_time'
export const ACTIVITY_END_TIME_FIELD = 'end_time'
export const DESCRIPTION_FIELD = 'description'

const TODAY = new Date()
const TODAY_PLUS_3 = new Date(TODAY.getTime() + (1000 * 60 * 60 * 72))
//const TODAY_PLUS_3_END = new Date(TODAY.getTime() + (1000 * 60 * 60 * 84))

class CreateActivityForm extends Component {
  state = {
    categoryImageSource: null
  }
  onExit() {
    console.log('CreateActivityForm::onExit')
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
      iconStyle,
      descriptionTextStyle,
      categoryParentStyle,
      categoryTitleStyle,
      column1Style,
      column2Style,
      row1,
      row2
    } = styles

    const categoryImage = this.state.categoryImageSource
      ? (<Image
          source={this.state.categoryImageSource}
          style={iconStyle}
      />)
      : (<Image
          source={defaultActivity}
          style={iconStyle}
      />)

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

        <Item style={categoryParentStyle}>

          <Item style={column1Style}>
            <Item style={row1}>
              <Image
                  source={category}
                  style={categoryTitleStyle}
              />
            </Item>

            <Item style={row2}>
              <PickerSelectInputFormField
                name={CATEGORY_FIELD}
                placeholder={{ label: 'select...', value: null }}
                hideIcon
                items={activityCategoriesKV}
                onValueChange={(value) => {
                  this.setState({
                    ...this.state,
                    categoryImageSource: getActivityImage(value)
                  })
                }}
              />
            </Item>
        </Item>

        <Item style={column2Style}>
          {categoryImage}
        </Item>
      </Item>

      <GenericTextInputFormField
        name={DESCRIPTION_FIELD}
        placeholder='describe...'
        placeholderColor='hsla(226, 11%, 21%, 0.6)'
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
          </Item>
          <Item style={timeItemStyle}>
            <DateTimePickerInputFormField
              name={ACTIVITY_START_TIME_FIELD}
              minDate={TODAY}
              maxDate={TODAY_PLUS_3}
              placeholder='select...'
            />
          </Item>
        </Item>

        <Item style={innerStyle}>
          <Item style={timeTitleItemStyle}>
            <Image
                source={end}
                style={timeTitlesStyle}
            />
          </Item>
          <Item style={timeItemStyle}>
            <DateTimePickerInputFormField
              name={ACTIVITY_END_TIME_FIELD}
              minDate={TODAY}
              //maxDate={TODAY_PLUS_3_END}
              placeholder='select...'
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
    </Form>
    )
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
    marginTop: 20,
  },
  itemStyle: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10
  },
  outterStile: {
    borderBottomWidth: 0,
    marginLeft: 50,
    marginRight: 50,
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
    height: 33,
    width: 100,
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  timeItemStyle: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginTop: 10,
    flex: 1.6
  },
  iconStyle: {
    height: 90,
    width: 90,
    resizeMode: 'center',
  },
  descriptionTextStyle: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    width: 280,
    height: 70,
    color: '#27608b',
  },
   categoryParentStyle: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    height: 100,
    marginTop: 7
   },
   column1Style: {
    flex: 1.6,
    flexDirection: 'column',
    borderBottomWidth: 0,
    paddingLeft: 10
   },
   row1: {
     borderBottomWidth: 0,
     paddingRight: 50
   },
   row2: {
     borderBottomWidth: 0,
     marginRight: 10
   },
   column2Style: {
    flex: 1.1,
    borderBottomWidth: 0,
  },
   categoryTitleStyle: {
     height: 34,
     width: 100,
   },
}

const mapStateToProps = (state) => {
  return { eventFeeds: state.eventFeeds }
}
export default connect(mapStateToProps)(
  reduxForm({ form: 'createActivityForm' }
)(CreateActivityForm))
