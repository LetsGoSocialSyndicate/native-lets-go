/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Dimensions } from 'react-native'

const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm'
const HEADER_HEIGHT = 50
const FOOTER_HEIGHT = 65

const { width, height } = Dimensions.get('window')
const CONTAINER_HEIGHT = height - 20
const CONTENT_WIDTH = width
const CONTENT_HEIGHT = height - HEADER_HEIGHT - FOOTER_HEIGHT - 40

export {
  HEADER_HEIGHT, FOOTER_HEIGHT,
  CONTAINER_HEIGHT, CONTENT_WIDTH, CONTENT_HEIGHT
}
