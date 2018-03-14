import React from 'react'
import ReactDOM from 'react-dom'
import './app.css'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Header from './components/Header'
import CreateEvent from './components/CreateEvent'
import NotFound from './components/NotFound'
import CityHome from './components/CityHome'
import About from './components/About'
import Contact from './components/Contact'

class Root extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path = "/" 
                            render={props => <App {...props}/> } 
                        />
                        <Route exact path = "/NewYorkCity/"
                            render={props => 
                                <CityHome 
                                    city = "New York City"
                                    cityPath = "NewYorkCity"
                                    cityId = {1}
                                    {...props}
                                />
                            } 
                        />
                        <Route exact path = "/NewYorkCity/CreateEvent/" 
                            render={props => 
                                <CreateEvent
                                    city = "New York City"
                                    cityId = {1}
                                    cityPath = "NewYorkCity"
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/NewYorkCity/about"
                            render={props => 
                                <About
                                    city = "New York City"
                                    cityPath = "NewYorkCity"
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/Philadelphia/"
                            render={props => 
                                <CityHome 
                                    city = "Philadelphia"
                                    cityPath = "Philadelphia"
                                    {...props}
                                />
                            } 
                        />
                        <Route exact path = "/about" component={About} />
                        <Route exact path = "/contact" component={Contact} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}
    
ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker();
