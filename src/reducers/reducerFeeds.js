/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import { FETCH_EVENT_FEEDS, FEEDS_ACTION_START, FEEDS_ACTION_ERROR,
  ADD_NEW_EVENT, FETCH_MY_EVENTS, FETCH_MY_ALL_EVENTS,
  FETCH_OTHER_ALL_EVENTS, COUNT_MY_ALL_EVENTS
} from '../actions/types'


const initialFeedsState = {
  // TODO: Do we really need both?
  //       Check if having only 'loading' is good enough.
  isLoading: false,
  isLoaded: false,
  error: null,
  eventFeeds: {}
}

function eventFeeds(state = initialFeedsState, action) {
  switch (action.type) {
  case FEEDS_ACTION_START: {
    console.log('reducer eventFeeds', state, action)
    return {
      ...state,
      isLoading: true,
      isLoaded: false,
      error: null
    }
  }
  case FEEDS_ACTION_ERROR: {
    console.log('reducer eventFeeds', state, action)
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      error: action.error,
    }
  }
  case FETCH_EVENT_FEEDS:
  case FETCH_MY_EVENTS:
  case FETCH_MY_ALL_EVENTS:
  case FETCH_OTHER_ALL_EVENTS: {
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
  }
  case COUNT_MY_ALL_EVENTS:
    console.log(action)
    return {
      ...state,
      statistics: action.statistics
    }

  case ADD_NEW_EVENT: {
    const newData = { ...state.eventFeeds }
    newData[action.payload.id] = action.payload
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      eventFeeds: { ...newData }
    }
  }
  default:
    return state
  }
}

export default eventFeeds
