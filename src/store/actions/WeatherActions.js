import { WeatherService } from '../../services/WeatherService'
import { FavoriteService } from '../../services/FavoriteService'

export function loadFavorites() {
  return async (dispatch) => {
    try {
      const favorites = await FavoriteService.loadFavorites()
      dispatch({ type: 'SET_FAVORITES', favorites })
    } catch (err) {
      console.error('Failed loading favorite:', err)
    }
  }
}

export function setCurrCity(city) {
  return async (dispatch, getState) => {
    try {
      let { currCity } = getState().WeatherModule
      currCity = await WeatherService.getWeather(city)
      if (!currCity) return
      dispatch({ type: 'SET_CITY', currCity })
    } catch (err) {
      console.error('Failed setting city:', err)
    }
  }
}

export function setFavorites(city) {
  return async (dispatch, getState) => {
    try {
      let { favorites } = getState().WeatherModule

      if (city.IsFavorite) {
        favorites = FavoriteService.add(city)
      } else {
        favorites = FavoriteService.remove(city.Id)
      }
      dispatch({ type: 'SET_FAVORITES', favorites })
    } catch (err) {
      console.error('Failed setting favorite:', err)
    }
  }
}

export function toggleImperial() {
  return async (dispatch, getState) => {
    try {
      const { isImperial } = getState().WeatherModule
      dispatch({ type: 'SET_IS_IMPERIAL', isImperial: !isImperial })
    } catch (err) {
      console.error('Failed switching unit:', err)
    }
  }
}

export function toggleLightMode() {
  return async (dispatch, getState) => {
    try {
      const { isLight } = getState().WeatherModule
      dispatch({ type: 'SET_IS_DARK', isLight: !isLight })
    } catch (err) {
      console.error('Failed switching mode:', err)
    }
  }
}
