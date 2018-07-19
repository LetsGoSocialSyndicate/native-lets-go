/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import { Dimensions } from 'react-native'

const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm'
const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`
const HEADER_HEIGHT = 50
const FOOTER_HEIGHT = 65

const { width, height } = Dimensions.get('window')
const CONTAINER_HEIGHT = height - 20
const CONTENT_WIDTH = width
const CONTENT_HEIGHT = height - HEADER_HEIGHT - FOOTER_HEIGHT - 40

const ACTIVITY_CATEGORIES = [
  'boardGame', 'camping', 'carPool', 'coffee',
  'crafts', 'cycling', 'drinking', 'fishing', 'food',
  'hiking', 'meeting', 'music', 'party', 'ski', 'sports',
  'study', 'videoGame', 'weights', 'yoga'
]

export {
  ACTIVITY_CATEGORIES, HEADER_HEIGHT, FOOTER_HEIGHT, DATETIME_FORMAT,
  CONTAINER_HEIGHT, CONTENT_WIDTH, CONTENT_HEIGHT, DATE_FORMAT, TIME_FORMAT
}
