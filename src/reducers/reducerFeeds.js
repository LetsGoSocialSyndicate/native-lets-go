/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import { FETCH_EVENT_FEEDS, FETCH_EVENT_FEEDS_START,
  ADD_NEW_EVENT, FETCH_MY_EVENTS, FETCH_MY_ALL_EVENTS, FETCH_OTHER_ALL_EVENTS
} from '../actions/types'


const initialFeedsState = {
  isLoading: false,
  isLoaded: false,
  eventFeeds: {}
}

function eventFeeds(state = initialFeedsState, action) {
  switch (action.type) {
  case FETCH_EVENT_FEEDS_START:
    //console.log('reducer eventFeeds', state, action)
    return {
      ...state,
      isLoading: true,
      isLoaded: false
    }

  case FETCH_EVENT_FEEDS:
  case FETCH_MY_EVENTS:
  case FETCH_MY_ALL_EVENTS:
  case FETCH_OTHER_ALL_EVENTS:
    // console.log('reducer eventFeeds', state, action)
    const mappedKey = action.payload.reduce((acc, feed) => {
      acc[feed.event_id] = { ...feed }
      return acc
    }, {})
    //console.log(mappedKey);
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      eventFeeds: mappedKey
    }

  case ADD_NEW_EVENT:
    const newData = { ...state.eventFeeds }
    newData[action.payload.id] = action.payload
    return {
      ...state,
      eventFeeds: { ...newData }
    }
  default:
    return state
  }
}

export default eventFeeds
