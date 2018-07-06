/*
 * Copyright 2018, Socializing Syndicate Corp.
 */
 import { combineReducers } from 'redux'
 import { reducer as form } from 'redux-form'
 import auth from './reducerAuth'
 import user from './reducerUser'

 export default combineReducers({
   auth,
   form,
   user
 })
