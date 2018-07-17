/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
const beerBlack = require('../../assets/activities/BeerBlack.png')
const beerWhite = require('../../assets/activities/BeerWhite.png')
const boardGameBlack = require('../../assets/activities/BoardGameBlack.png')
const boardGameWhite = require('../../assets/activities/BoardGameWhite.png')
const campingBlack = require('../../assets/activities/CampingBlack.png')
const campingWhite = require('../../assets/activities/CampingWhite.png')
const carpoolBlack = require('../../assets/activities/CarpoolBlack.png')
const carpoolWhite = require('../../assets/activities/CarpoolWhite.png')
const coffeeBlack = require('../../assets/activities/CoffeeBlack.png')
const coffeeWhite = require('../../assets/activities/CoffeeWhite.png')
const craftsBlack = require('../../assets/activities/CraftsBlack.png')
const craftsWhite = require('../../assets/activities/CraftsWhite.png')
const cyclingBlack = require('../../assets/activities/CyclingBlack.png')
const cyclingWhite = require('../../assets/activities/CyclingWhite.png')
const fishingBlack = require('../../assets/activities/FishingBlack.png')
const fishingWhite = require('../../assets/activities/FishingWhite.png')
const foodBlack = require('../../assets/activities/FoodBlack.png')
const foodWhite = require('../../assets/activities/FoodWhite.png')
const hikingBlack = require('../../assets/activities/HikingBlack.png')
const hikingWhite = require('../../assets/activities/HikingWhite.png')
const meetingBlack = require('../../assets/activities/MeetingBlack.png')
const meetingWhite = require('../../assets/activities/MeetingWhite.png')
const musicBlack = require('../../assets/activities/MusicBlack.png')
const musicWhite = require('../../assets/activities/MusicWhite.png')
const partyBlack = require('../../assets/activities/PartyBlack.png')
const partyWhite = require('../../assets/activities/PartyWhite.png')
const skiBlack = require('../../assets/activities/SkiBlack.png')
const skiWhite = require('../../assets/activities/SkiWhite.png')
const sportsBlack = require('../../assets/activities/SportsBlack.png')
const sportsWhite = require('../../assets/activities/SportsWhite.png')
const studyBlack = require('../../assets/activities/StudyBlack.png')
const studyWhite = require('../../assets/activities/StudyWhite.png')
const videoGameBlack = require('../../assets/activities/VideoGameBlack.png')
const videoGameWhite = require('../../assets/activities/VideoGameWhite.png')
const weightsBlack = require('../../assets/activities/WeightsBlack.png')
const weightsWhite = require('../../assets/activities/WeightsWhite.png')
const yogaBlack = require('../../assets/activities/YogaBlack.png')
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

export { activityCategories, getActivityImage }
