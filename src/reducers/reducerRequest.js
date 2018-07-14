/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
import { REQUEST_SUBMIT  } from '../actions/types'

const initialState = {

}

function requestToJoin(state = initialState, action) {
  switch(action.type) {
    case REQUEST_SUBMIT:
      return {
        ...state
      }
    default:
      return state
  }
}

export default requestToJoin
