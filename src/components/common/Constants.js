/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Dimensions } from 'react-native'

const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm'
const HEADER_HEIGHT = 62
const FOOTER_HEIGHT = 70

const { width, height } = Dimensions.get('window')
const CONTAINER_HEIGHT = height
const CONTENT_WIDTH = width
const CONTENT_HEIGHT = height - HEADER_HEIGHT - FOOTER_HEIGHT

export {
  HEADER_HEIGHT, FOOTER_HEIGHT,
  CONTAINER_HEIGHT, CONTENT_WIDTH, CONTENT_HEIGHT
}
