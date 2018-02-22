import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Header from './components/Header'
import CreateEvent from './components/CreateEvent'
import NotFound from './components/NotFound'
import CityHome from './components/CityHome'

class Root extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path = "/" component={App} />
                        <Route exact path = "/:city_name/" component={CityHome} />
                        <Route exact path = "/:city_name/createevent/" component={CreateEvent} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}
    
ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker();
