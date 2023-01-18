import axios from 'axios'
import { StorageService } from './StorageService.js'

export const WeatherService = {
  getCities,
  getWeather,
  getForecast,
}

const API_KEY = '3zhMvmfuTuqIrs27ZTGLMaLB6Z3A82MA'

const WEATHER_KEY = 'weather_db'
const FORECAST_KEY = 'forecast_db'
const FAVORITE_KEY = 'favorite_db'


async function getCities(value) {
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`
    )
    return res.data
  } catch (err) {
    console.error('Failed getting cities', err)
  }
}

async function getWeather(city) {

  let weather = StorageService.load(WEATHER_KEY)
  const favorites = StorageService.load(FAVORITE_KEY)

  if (!weather && !city) city = await _getGeoLocation()
  if (weather && !city) return weather
  if (weather?.LocalizedName === city?.LocalizedName) return

  if (favorites) {
    const favorite = favorites.find((favorite) => favorite.Key === city.Key)
    if (favorite) return favorite
  }

  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/currentconditions/v1/${city.Key}?apikey=${API_KEY}`
    )

    const data = res.data[0]

    weather = {
      Id: _makeId(),
      Key: city.Key,
      LocalizedName: city.LocalizedName,
      LocalObservationDateTime: data.LocalObservationDateTime,
      EpochTime: data.EpochTime,
      WeatherText: data.WeatherText,
      Temperature: data.Temperature,
      IsDayTime: data.IsDayTime,
      IsFavorite: city.IsFavorite || false,
    }

    StorageService.store(WEATHER_KEY, weather)
    return weather

  } catch (err) {
    console.error(`Failed getting ${city?.LocalizedName} weather`, err)
  }
}

async function getForecast(cityKey) {
  try {
    const res = await axios.get(
      `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}`
    )
    const forecasts = res.data.DailyForecasts

    StorageService.store(FORECAST_KEY, forecasts)
    return forecasts

  } catch (err) {
    console.error('Failed getting forecast', err)
  }
}

async function _getGeoLocation() {
  try {
    let position = await _getPosition()

    if (!position) {
      position = {
        coords: {
          latitude: 32.0853,
          longitude: 34.7818,
        }
      }
    }

    const res = await axios.get(
      `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${position.coords.latitude}%2C${position.coords.longitude}`
    )
    return res.data

  } catch (err) {
    console.error('Failed getting your location', err)
  }
}

function _getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function _makeId(length = 12) {
  var txt = '';
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}