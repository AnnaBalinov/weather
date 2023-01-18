import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { WeatherService } from '../services/WeatherService'
import { setFavorites } from '../store/actions/WeatherActions'
import { CityFilter } from '../cmps/CityFilter'
import { CityPreview } from '../cmps/CityPreview'
import { ForecastList } from '../cmps/ForecastList'
import { LoadingSpinner } from '../cmps/LoadingSpinner'
import { ToastContainer, toast } from 'react-toastify'

export function WeatherPage() {

    const dispatch = useDispatch()

    const [currCityForecasts, setCurrCityForecasts] = useState([])
    const [backgroundImage, setBackgroundImage] = useState(null)

    const { currCity } = useSelector((state) => state.WeatherModule)
    const { isImperial } = useSelector((state) => state.WeatherModule)

    useEffect(() => {
        setImageSrc()
        setForecasts()
        // eslint-disable-next-line
    }, [currCity])

    const setImageSrc = () => {
        if (!currCity) return
        
        const txt = `${currCity.LocalizedName},${currCity.WeatherText}`.replaceAll(' ', '-')
        const imageUrl = `https://source.unsplash.com/1920x1080/?${txt},aesthetic`
        
        const image = new Image()
        image.src = imageUrl
        image.onload = () => {
            setBackgroundImage(imageUrl)
        }
    }

    const toggleFavorite = () => {
        !currCity.IsFavorite ?
            currCity.IsFavorite = true
            :
            currCity.IsFavorite = !currCity.IsFavorite
        dispatch(setFavorites(currCity))

        const msg = currCity.IsFavorite
            ? `${currCity.LocalizedName}  added to your favorites!`
            : `${currCity.LocalizedName} removed from your favorites!`
        toast.success(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    const setForecasts = async () => {
        try {
            if (!currCity) return
            const forecasts = await WeatherService.getForecast(currCity.Key)
            setCurrCityForecasts(forecasts)
        } catch (err) {
            console.error('Failed getting forecast', err)
        }
    }

    if (!currCity || !currCityForecasts || !backgroundImage) return <LoadingSpinner />

    return (
        <section className="main-section scrollbar">
            <ToastContainer />
            <CityFilter />
            <div className="weather-main" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <CityPreview city={currCity} toggleFavorite={toggleFavorite} isImperial={isImperial} />
                <ForecastList forecasts={currCityForecasts} isImperial={isImperial} />
            </div>
        </section>
    )
}
