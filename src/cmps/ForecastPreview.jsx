import Moment from 'react-moment'
import { WeatherPreview } from './WeatherPreview'

export const ForecastPreview = ({ forecast, isImperial }) => {

  const setTemperatureUnit = () => {

    const imperialMin = forecast.Temperature.Minimum.Value      ///  ℉
    const imperialMax = forecast.Temperature.Maximum.Value      ///  ℉
    const metricMin = ((imperialMin - 32) * (5 / 9)).toFixed()  /// (℉-32)*(5/9)
    const metricMax = ((imperialMax - 32) * (5 / 9)).toFixed()  /// (℉-32)*(5/9)

    const degrees = isImperial ? `${imperialMin} / ${imperialMax} °F` : `${metricMin} / ${metricMax} °C`

    return degrees

  }

  return (
    <div className="forecast-preview-container">
      <div className="date">
        <Moment className="day" format="dddd">{forecast.Date}</Moment>
        <Moment format="D MMM">{forecast.Date}</Moment>
      </div>
      <div className="forecast">
        <div className="icon">
          <WeatherPreview weatherText={forecast.Day.IconPhrase} />
        </div>
        <div className="temperature">
          {setTemperatureUnit()}
        </div>
      </div>
      <div className="txt">
        <span>{forecast.Day.IconPhrase}</span>
      </div>
    </div>
  )
}

