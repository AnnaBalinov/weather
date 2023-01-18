const INITIAL_STATE = {
  currCity: null,
  favorites: null,
  isImperial: null,
  isLight: null,
}

export function WeatherReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CITY':
      return {
        ...state,
        currCity: action.currCity,
      }
    case 'SET_FAVORITES':
      return {
        ...state,
        favorites: action.favorites,
      }
    case 'SET_IS_IMPERIAL':
      return {
        ...state,
        isImperial: action.isImperial,
      }
    case 'SET_IS_DARK':
      return {
        ...state,
        isLight: action.isLight,
      }
    default:
      return state
  }
}
