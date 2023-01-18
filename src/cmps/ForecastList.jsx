import { ForecastPreview } from './ForecastPreview'

export const ForecastList = ({ forecasts, isImperial }) => {
    return (
        <section className="forecast-list-container scrollbar">
            {forecasts.map((forecast) => (
                <ForecastPreview key={forecast.Date} forecast={forecast} isImperial={isImperial} />
            ))}
        </section>
    )
}
