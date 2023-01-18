import { applyMiddleware, combineReducers, compose } from 'redux'
import { legacy_createStore as createStore } from "redux"
import thunk from 'redux-thunk'
import { WeatherReducer } from './reducers/WeatherReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
  WeatherModule: WeatherReducer,
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

window.myStore = store
