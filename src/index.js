import React from 'react'
import ReactDOM from 'react-dom'
import './styles/app.css'
import registerServiceWorker from './registerServiceWorker'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import CreateEvent from './components/CreateEvent'
import NotFound from './components/NotFound'
import CityHome from './components/CityHome'
import About from './components/About'
import Contact from './components/Contact'
import ConfirmEvent from './components/ConfirmEvent'
import EventPage from './components/EventPage'
import DontSeeYourCity from './components/DontSeeYourCity'
import Admin from './components/admin_pages/Admin'
import AdminHome from './components/admin_pages/AdminHome'
import Unauthorized from './components/admin_pages/Unauthorized'
import AdminCityHome from './components/admin_pages/AdminCityHome'
import AdminEventPage from './components/admin_pages/AdminEventPage'
import AdminEditEvent from './components/admin_pages/AdminEditEvent'

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
                                    cityHome = {true}
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
                                    cityHome = {false}
                                    admin = {false}
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
                                    cityHome = {false}
                                    admin = {false}
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/NewYorkCity/event/:event_id"
                            render={props => 
                                <EventPage
                                    city = "New York City"
                                    cityPath = "NewYorkCity"
                                    cityHome = {false}
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
                                    cityHome = {true}
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
                                    cityHome = {false}
                                    admin = {false}
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
                                    cityHome = {false}
                                    admin = {false}
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/Philadelphia/event/:event_id"
                            render={props => 
                                <EventPage
                                    city = "Philadelphia"
                                    cityPath = "Philadelphia"
                                    cityHome = {false}
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/about" 
                            render={props => 
                                <About
                                    cityHome = {false}
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/contact" 
                            render={props => 
                                <Contact
                                    cityHome = {false}
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/DontSeeYourCity/"
                            render={props => 
                                <DontSeeYourCity
                                    cityHome = {false}  
                                    {...props}
                                />
                            } 
                        />
                        <Route exact path = "/admin" 
                            render={props => 
                                <Admin
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/admin/true" 
                            render={props => 
                                <AdminHome
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/admin/false" 
                            render={props => 
                                <Unauthorized
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/admin/NewYorkCity" 
                            render={props => 
                                <AdminCityHome
                                    cityName = "New York City"
                                    cityPath = "admin" // used for header
                                    realCityPath = "NewYorkCity"
                                    cityId = {1}
                                    cityHome = {false}
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/admin/NewYorkCity/CreateEvent" 
                            render={props => 
                                <CreateEvent
                                    city = "admin"
                                    cityName = "New York City"
                                    cityPath = "admin"
                                    cityId = {1}
                                    cityHome = {false}
                                    admin = {true}
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/admin/NewYorkCity/ConfirmEvent" 
                            render={props => 
                                <ConfirmEvent
                                    city = "admin"
                                    cityName = "New York City"
                                    cityPath = "admin"
                                    cityId = {1}
                                    cityHome = {false}
                                    admin = {true}
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/admin/NewYorkCity/:event_id" 
                            render={props => 
                                <AdminEventPage
                                    cityName = "New York City"
                                    cityPath = "admin"
                                    realCityPath = "NewYorkCity"
                                    cityId = {1}
                                    cityHome = {false}
                                    {...props}
                                />
                            }
                        />
                        <Route exact path = "/admin/NewYorkCity/EditEvent/:event_id" 
                            render={props => 
                                <AdminEditEvent
                                    cityName = "New York City"
                                    cityPath = "admin"
                                    realCityPath = "NewYorkCity"                                    
                                    cityId = {1}
                                    cityHome = {false}
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
