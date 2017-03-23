import { combineReducers } from 'redux'

import linksReducer from './components/links/reducer'

const initialState = {}

const combinedReducers = combineReducers({
  links: linksReducer
})

function rootReducer (state=initialState, action) {
  // Do any custom reducing that won't fit neatly
  // in a sub-reducer.
  return combinedReducers(state, action)
}

export default rootReducer
