import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadFavorites, setCurrCity, setFavorites } from '../store/actions/WeatherActions'
import { FavoriteList } from '../cmps/FavoriteList'
import { ToastContainer, toast } from 'react-toastify'

export function FavoritePage() {

    const { currCity } = useSelector((state) => state.WeatherModule)
    const { favorites } = useSelector((state) => state.WeatherModule)
    const { isImperial } = useSelector((state) => state.WeatherModule)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadFavorites())
        // eslint-disable-next-line
    }, [])

    const removeFavorite = async (city) => {
        city.IsFavorite = false
        if (city.Id === currCity.Id) {
            currCity.IsFavorite = false
        }
        dispatch(setFavorites(city))

        const msg = `${city.LocalizedName} removed from your favorites!`
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

    const setCity = (city) => {
        dispatch(setCurrCity(city))
    }

    return (
        <section className="main-section scrollbar favorite-container">
            <ToastContainer />
            <h1 className="title">YOUR FAVORITE CITIES</h1>
            {
                favorites && favorites.length ?
                    <FavoriteList favorites={favorites} isImperial={isImperial}
                        removeFavorite={removeFavorite} setCity={setCity} />
                    :
                    <div className="msg">No favorites yet..</div>
            }
        </section>
    )
}
