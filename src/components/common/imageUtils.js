/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import ImageResizer from 'react-native-image-resizer'

const beerWhite = require('../../assets/activities/BeerWhite.png')
const boardGameWhite = require('../../assets/activities/BoardGameWhite.png')
const campingWhite = require('../../assets/activities/CampingWhite.png')
const carpoolWhite = require('../../assets/activities/CarpoolWhite.png')
const coffeeWhite = require('../../assets/activities/CoffeeWhite.png')
const craftsWhite = require('../../assets/activities/CraftsWhite.png')
const cyclingWhite = require('../../assets/activities/CyclingWhite.png')
const fishingWhite = require('../../assets/activities/FishingWhite.png')
const foodWhite = require('../../assets/activities/FoodWhite.png')
const hikingWhite = require('../../assets/activities/HikingWhite.png')
const meetingWhite = require('../../assets/activities/MeetingWhite.png')
const musicWhite = require('../../assets/activities/MusicWhite.png')
const partyWhite = require('../../assets/activities/PartyWhite.png')
const skiWhite = require('../../assets/activities/SkiWhite.png')
const sportsWhite = require('../../assets/activities/SportsWhite.png')
const studyWhite = require('../../assets/activities/StudyWhite.png')
const videoGameWhite = require('../../assets/activities/VideoGameWhite.png')
const weightsWhite = require('../../assets/activities/WeightsWhite.png')
const yogaWhite = require('../../assets/activities/YogaWhite.png')
const defaultImage = require('../../assets/activities/gallery_hero.jpg')

const activityCategories = [
  'Beer',
  'Board Game',
  'Camping',
  'Carpool',
  'Coffee',
  'Crafts',
  'Cycling',
  'Fishing',
  'Food',
  'Hiking',
  'Meeting',
  'Music',
  'Party',
  'Ski',
  'Sports',
  'Study',
  'Video Game',
  'Weights',
  'Yoga'
]

const activityCategoriesKV = activityCategories.map(item => {
  return { label: item, value: item }
})

const getActivityImage = (category) => {
  switch (category) {
    case 'Beer':
      return beerWhite
    case 'Board Game':
      return boardGameWhite
    case 'Camping':
      return campingWhite
    case 'Carpool':
      return carpoolWhite
    case 'Coffee':
      return coffeeWhite
    case 'Crafts':
      return craftsWhite
    case 'Cycling':
      return cyclingWhite
    case 'Fishing':
      return fishingWhite
    case 'Food':
      return foodWhite
    case 'Hiking':
      return hikingWhite
    case 'Meeting':
      return meetingWhite
    case 'Music':
      return musicWhite
    case 'Party':
      return partyWhite
    case 'Ski':
      return skiWhite
    case 'Sports':
      return sportsWhite
    case 'Study':
      return studyWhite
    case 'Video Game':
      return videoGameWhite
    case 'Weights':
      return weightsWhite
    case 'Yoga':
      return yogaWhite
    default:
      return defaultImage
  }
}

const MAX_IMAGE_HEIGHT = 400
const MAX_IMAGE_WIDTH = 400
const MAX_IMAGE_SIZE = MAX_IMAGE_HEIGHT * MAX_IMAGE_WIDTH

// Returns Promise with uri to resized image
const downsizeImage = (uri, format, width, height) => {
  if (height * width <= MAX_IMAGE_SIZE) {
    return Promise.resolve(uri)
  }
  const compressFormat = format && format.toLowerCase() === 'png' ? 'PNG' : 'JPEG'
  return ImageResizer.createResizedImage(
    uri, MAX_IMAGE_WIDTH, MAX_IMAGE_HEIGHT, compressFormat, 80
  ).then(response => {
    console.log('downsizeImage:', response)
    return [response.uri, compressFormat.toLowerCase()]
  })
}
export { activityCategories, activityCategoriesKV, getActivityImage, downsizeImage }
