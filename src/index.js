import React from 'react'
import ReactDOM from 'react-dom'
import './styles/app.css'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Header from './components/Header'
import CreateEvent from './components/CreateEvent'
import NotFound from './components/NotFound'
import CityHome from './components/CityHome'
import About from './components/About'
import Contact from './components/Contact'
import ConfirmEvent from './components/ConfirmEvent'
import EventPage from './components/EventPage'
import DontSeeYourCity from './components/DontSeeYourCity'

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
                        <Route exact path = "/NewYorkCity/ConfirmEvent/" 
                            render={props => 
                                <ConfirmEvent
                                    city = "New York City"
                                    cityId = {1}
                                    cityPath = "NewYorkCity"
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/NewYorkCity/event/:event_id"
                            render={props => 
                                <EventPage
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
                                    cityId = {2}
                                    cityPath = "Philadelphia"
                                    {...props}
                                />
                            } 
                        />
                        <Route exact path = "/Philadelphia/CreateEvent/" 
                            render={props => 
                                <CreateEvent
                                    city = "Philadelphia"
                                    cityId = {2}
                                    cityPath = "Philadelphia"
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/Philadelphia/ConfirmEvent/" 
                            render={props => 
                                <ConfirmEvent
                                    city = "Philadelphia"
                                    cityId = {2}
                                    cityPath = "Philadelphia"
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/Philadelphia/event/:event_id"
                            render={props => 
                                <EventPage
                                    city = "Philadelphia"
                                    cityPath = "Philadelphia"
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/about" component={About} />
                        <Route exact path = "/contact" component={Contact} />
                        <Route exact path = "/DontSeeYourCity/"
                            render={props => 
                                <DontSeeYourCity 
                                    {...props}
                                />
                            } 
                        />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        )
    }
}
    
ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker();
