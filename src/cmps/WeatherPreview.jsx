import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faCloudSun, faCloud, faSmog, faCloudRain, faCloudSunRain, faCloudBolt, faCloudShowersHeavy, faSnowflake, faWind } from "@fortawesome/free-solid-svg-icons"

export const WeatherPreview = ({ weatherText }) => {

    const setWeather = () => {
        switch (weatherText.toLowerCase()) {
            case 'sunny':
            case 'mostly sunny':
            case 'partly sunny':
            case 'hot':
            case 'clear':
            case 'mostly clear':
                return <FontAwesomeIcon icon={faSun} className="fa-sun" />
            case 'intermittent clouds':
            case 'hazy sunshine':
            case 'mostly cloudy':
            case 'mostly cloudy w/ flurries':
            case 'partly sunny w/ flurries':
            case 'clouds and sun':
                return <FontAwesomeIcon icon={faCloudSun} className="fa-cloud-sun" />
            case 'cloudy':
            case 'partly cloudy':
            case 'dreary (Overcast)':
                return <FontAwesomeIcon icon={faCloud} className="fa-cloud" />
            case 'fog':
            case 'flurries':
                return <FontAwesomeIcon icon={faSmog} className="fa-smog" />
            case 'showers':
            case 'light rain':
                return <FontAwesomeIcon icon={faCloudRain} className="fa-cloud-rain" />
            case 'rain':
            case 'sleet':
            case 'freezing rain':
                return <FontAwesomeIcon icon={faCloudShowersHeavy} className="fa-cloud-showers-heavy" />
            case 'mostly cloudy w/ showers':
            case 'partly sunny w/ showers':
                return <FontAwesomeIcon icon={faCloudSunRain} className="fa-cloud-sun-rain" />
            case 't-storms':
            case 'mostly cloudy w/ t-Storms':
                return <FontAwesomeIcon icon={faCloudBolt} className="fa-cloud-bolt" />
            case 'snow':
            case 'mostly cloudy w/ snow':
            case 'ice':
            case 'rain and snow':
            case 'cold':
                return <FontAwesomeIcon icon={faSnowflake} className="fa-snowflake" />
            case 'windy':
                return <FontAwesomeIcon icon={faWind} className="a-wind" />
            default:
                return <FontAwesomeIcon icon={faCloud} className="fa-cloud" />
        }
    }

    return (
        <div className="weather-preview-container">
            {setWeather()}
        </div>
    )
}