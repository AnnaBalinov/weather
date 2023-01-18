import { StorageService } from './StorageService'

export const FavoriteService = {
  loadFavorites,
  remove,
  add,
}

const FAVORITES = [{
  "Id": "fsSBq0rzwAej",
  "LocalizedName": "New York",
  "Key": "215834",
  "IsFavorite": true,
  "LocalObservationDateTime": "2022-12-22T11:53:00+02:00",
  "EpochTime": 1671702780,
  "WeatherText": "Partly sunny",
  "IsDayTime": true,
  "Temperature": {
    "Metric": {
      "Value": 18.9,
      "Unit": "C",
      "UnitType": 17
    },
    "Imperial": {
      "Value": 66,
      "Unit": "F",
      "UnitType": 18
    }
  }
},
{
  "Id": "aBRMegqcfXqZ",
  "LocalizedName": "Tokyo",
  "Key": "226396",
  "IsFavorite": true,
  "LocalObservationDateTime": "2022-12-25T05:38:00+09:00",
  "EpochTime": 1671914280,
  "WeatherText": "Clear",
  "IsDayTime": false,
  "Temperature": {
    "Metric": {
      "Value": 3.3,
      "Unit": "C",
      "UnitType": 17
    },
    "Imperial": {
      "Value": 38,
      "Unit": "F",
      "UnitType": 18
    }
  }
},
{
  "Id": "5JmsW4zBJRXX",
  "LocalizedName": "Tel Aviv",
  "Key": "215854",
  "IsFavorite": true,
  "LocalObservationDateTime": "2022-12-24T22:38:00+02:00",
  "EpochTime": 1671914280,
  "WeatherText": "Cloudy",
  "IsDayTime": false,
  "Temperature": {
    "Metric": {
      "Value": 14.1,
      "Unit": "C",
      "UnitType": 17
    },
    "Imperial": {
      "Value": 57,
      "Unit": "F",
      "UnitType": 18
    }
  }
},
{
  "Id": "B0E7B8oqMyEE",
  "LocalizedName": "Ibiza",
  "Key": "2723655",
  "IsFavorite": true,
  "LocalObservationDateTime": "2022-12-24T17:35:00-03:00",
  "EpochTime": 1671914100,
  "WeatherText": "Partly sunny",
  "IsDayTime": true,
  "Temperature": {
    "Metric": {
      "Value": 31.1,
      "Unit": "C",
      "UnitType": 17
    },
    "Imperial": {
      "Value": 88,
      "Unit": "F",
      "UnitType": 18
    }
  }
},
{
  "Id": "vl1cQBrnSrJX",
  "LocalizedName": "Yakutsk",
  "Key": "290150",
  "IsFavorite": true,
  "LocalObservationDateTime": "2022-12-25T05:43:00+09:00",
  "EpochTime": 1671914580,
  "WeatherText": "Cloudy",
  "IsDayTime": false,
  "Temperature": {
    "Metric": {
      "Value": -26.5,
      "Unit": "C",
      "UnitType": 17
    },
    "Imperial": {
      "Value": -16,
      "Unit": "F",
      "UnitType": 18
    }
  }
}
]

const FAVORITE_KEY = 'favorite_db'

function loadFavorites() {
  let favorites = StorageService.load(FAVORITE_KEY)
  if (!favorites || !favorites?.length) favorites = FAVORITES
  StorageService.store(FAVORITE_KEY, favorites)

  return favorites
}

function remove(id) {
  let favorites = StorageService.load(FAVORITE_KEY)
  const idx = favorites.findIndex((city) => city.Id === id)
  favorites.splice(idx, 1)
  StorageService.store(FAVORITE_KEY, favorites)

  return favorites
}

function add(city) {
  let favorites = StorageService.load(FAVORITE_KEY)
  const favorite = favorites.find((favorite) => favorite.LocalizedName === city.LocalizedName)
  if (favorite) return

  const cityCopy = JSON.parse(JSON.stringify(city))
  favorites.unshift(cityCopy)
  StorageService.store(FAVORITE_KEY, favorites)

  return favorites
}
