import { useState, useCallback, useEffect } from 'react'
import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'
import { WeatherService } from '../services/WeatherService'
import { setCurrCity } from '../store/actions/WeatherActions'

export const CityFilter = () => {

    const [txt, setTxt] = useState('')
    const [cities, setCities] = useState([])

    const dispatch = useDispatch()

    const updateQuery = async () => {
        if (!txt) return setCities(null)
        const currCities = await WeatherService.getCities(txt)
        setCities(currCities)
    }
    
    const delayedQuery = useCallback(debounce(updateQuery, 800), [txt])

    const handleChange = (ev) => {
        const txt = ev.target.value
        if (!txt) {
            resetData()
            return
        }
        setTxt(txt)
    }

    const handleClick = (city) => {
        dispatch(setCurrCity(city))
        resetData()
    }

    const resetData = () => {
        setTxt('')
        console.log('cities', cities)
        setCities(null)
    }

    useEffect(() => {
        delayedQuery()
        return delayedQuery.cancel
    }, [txt, delayedQuery])

    return (
        <section className="city-filter-container">
            <span className="material-icons">place</span>
            <div className={cities ? 'filter-container active' : 'filter-container'}>
                <input onChange={handleChange} type="text" placeholder="Search for city" value={txt} />

                <div className="autocomplete-list">
                    {
                        cities && cities.map(city => {
                            return (
                                <div className="city-name" onClick={() => handleClick(city)} key={city.Key}>
                                    {city.LocalizedName}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
