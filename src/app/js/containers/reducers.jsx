import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'

// component reducers
import { syncReducer } from './SyncView/reducer'

// combined reducer
export const reducer = combineReducers({
    routing,
    sync: syncReducer
})

export const initialState = {}
