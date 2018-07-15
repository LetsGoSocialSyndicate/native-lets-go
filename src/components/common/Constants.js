/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import React from 'react'
import { Dimensions } from 'react-native'

export const DATE_FORMAT = 'YYYY-MM-DD'
export const TIME_FORMAT = 'HH:mm'
export const HEADER_HEIGHT = 62
export const FOOTER_HEIGHT = 70

const { width, height } = Dimensions.get('window')
export const CONTENT_WIDTH = width
export const CONTENT_HEIGHT = height - HEADER_HEIGHT - FOOTER_HEIGHT
