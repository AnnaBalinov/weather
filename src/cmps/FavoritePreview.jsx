import { withRouter } from 'react-router-dom'
import { LoadingSpinner } from './LoadingSpinner'
import { WeatherPreview } from './WeatherPreview'

function _FavoritePreview({ history, favorite, isImperial, setCity, removeFavorite }) {

    const onFavoriteCity = () => {
        setCity(favorite)
        history.push('/')
    }

    const onRemoveFavorite = (event) => {
        event.stopPropagation()
        removeFavorite(favorite)
    }

    if (!favorite) return <LoadingSpinner />

    return (
        <section className="favorite-preview-container" onClick={onFavoriteCity}>
            <div className="favorite-remove-btn" onClick={onRemoveFavorite}>
                <span className="material-icons">favorite</span>
            </div>
            <div className="info">
                <div className="name">{favorite.LocalizedName}</div>
            </div>
            {
                isImperial ?
                    <div className="temperature">
                        <span className="num">{favorite.Temperature.Imperial.Value.toFixed()}</span>
                        <span className="unit"> °F</span>
                    </div>
                    :
                    <div className="temperature">
                        <span className="num">{favorite.Temperature.Metric.Value.toFixed()}</span>
                        <span className="unit"> °C</span>
                    </div>
            }
            <div className="weather">
                <WeatherPreview weatherText={favorite.WeatherText} />
                <span className="txt">{favorite.WeatherText}</span>
            </div>
        </section>
    )
}

export const FavoritePreview = withRouter(_FavoritePreview)

