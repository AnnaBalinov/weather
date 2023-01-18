import './assets/styles/global.css'
import 'react-toastify/dist/ReactToastify.css'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrCity, loadFavorites } from './store/actions/WeatherActions'
import { AppHeader } from "./cmps/AppHeader"
import { WeatherPage } from './pages/WeatherPage'
import { FavoritePage } from './pages/FavoritePage'

function App() {

  const dispatch = useDispatch()

  const { isLight } = useSelector((state) => state.WeatherModule)

  useEffect(() => {
    dispatch(setCurrCity())
    dispatch(loadFavorites())
    // eslint-disable-next-line
  }, [])

  return (
    <Router>
      <div className="App" id={isLight ? 'light' : 'dark'}>
        <AppHeader />
        <Switch>
          <Route path="/favorite" component={FavoritePage} />
          <Route path="/" component={WeatherPage} />
        </Switch>
      </div>
    </Router>

  )
}

export default App
