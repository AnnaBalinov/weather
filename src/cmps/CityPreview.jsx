import Moment from 'react-moment'
import { WeatherPreview } from './WeatherPreview'

export const CityPreview = ({ city, toggleFavorite, isImperial }) => {

    return (
        <section className="city-preview-container" >
            <div className="city-info">
                {
                    isImperial ?
                        <div className="temperature">
                            <span className="num">{city.Temperature.Imperial.Value.toFixed()}</span>
                            <span className="unit"> °F</span>
                        </div>
                        :
                        <div className="temperature">
                            <span className="num">{city.Temperature.Metric.Value.toFixed()}</span>
                            <span className="unit"> °C</span>
                        </div>

                }
                <div className="data">
                    <div className="name">{city.LocalizedName}</div>
                    <div className="date">
                        <Moment format="dddd">{city.LocalObservationDateTime}</Moment> -
                        <Moment format="MMMM Do YYYY, h:mm a">{city.LocalObservationDateTime}</Moment>
                    </div>
                </div>
                <div className="weather">
                    <WeatherPreview weatherText={city.WeatherText} />
                    <span className="txt">{city.WeatherText}</span>
                </div>
                <div className="favorite-icon" onClick={toggleFavorite}>
                    {
                        city.IsFavorite ?
                            <span className="material-icons true">favorite</span>
                            :
                            <span className="material-icons false">favorite_border</span>
                    }
                </div>
            </div>
        </section>
    )
}
