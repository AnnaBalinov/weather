import { useState } from 'react'
import { NavLink, withRouter } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { toggleImperial, toggleLightMode } from '../store/actions/WeatherActions'


function _AppHeader({ history }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isImperial } = useSelector((state) => state.WeatherModule)
    const { isLight } = useSelector((state) => state.WeatherModule)

    const dispatch = useDispatch()

    const toggleMenu = () => {
        setIsMenuOpen(current => !current)
    }

    const toggleIsImperial = () => {
        dispatch(toggleImperial())
    }

    const toggleIsLight = () => {
        dispatch(toggleLightMode())
    }

    const goToHome = () => {
        history.push('/')
    }

    return (
        <header className="app-header-container">

            <div className="header-logo-container" onClick={goToHome}>
                <div className="logo-img">
                    <img src={require(`../assets/img/weather-logo.png`)} alt="weather-logo" />
                </div>
            </div>
            <nav className="nav-bar">
                <div className="main-nav">
                    <NavLink activeClassName="my-active" exact to="/">Weather</NavLink>
                    <NavLink activeClassName="my-active" to="/favorite">Favorites</NavLink>
                </div>

                {/* ////////small-screen//////// */}
                <div className="menu-icon" onClick={toggleMenu}>
                    {
                        isMenuOpen ?
                            <span class="material-icons">close</span>
                            :
                            <span className="material-icons">menu</span>
                    }
                </div>

                {
                    isMenuOpen ?
                        <div className="small-screen-nav-container">
                            <div className="small-screen-nav">
                                <NavLink activeClassName="my-active" exact to="/">Weather</NavLink>
                                <NavLink activeClassName="my-active" to="/favorite">Favorites</NavLink>
                            </div>
                        </div>
                        :
                        null
                }
                {/* ////////small-screen//////// */}

                <div className="toggle-units-btn" onClick={toggleIsImperial}>
                    <div className="units-icon">
                        <span>{isImperial ? '°C' : '°F'}</span>
                    </div>
                    <div className="button-message-units">
                        Switch unit
                    </div>
                </div>

                <div className="toggle-mode-btn" onClick={toggleIsLight}>
                    <div className="mode-icon">
                        {
                            isLight ?
                                <span className="material-icons">toggle_on</span>
                                :
                                <span className="material-icons">toggle_off</span>
                        }
                        <div className="button-message-mode">
                            Switch theme
                        </div>
                    </div>
                </div>

            </nav>
        </header>
    )

}

export const AppHeader = withRouter(_AppHeader)