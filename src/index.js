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
                    <Header />
                    <Switch>
                        <Route exact path = "/" 
                            render={props => <App {...props}/> } 
                        />
                        <Route exact path = "/NewYorkCity/"
                            render={props => 
                                <CityHome 
                                    city = "New York City"
                                    cityPath = "NewYorkCity"
                                />
                            } 
                        />
                        <Route exact path = "/NewYorkCity/CreateEvent/" 
                            render={props => 
                                <CreateEvent
                                    city = {1}
                                />
                            }
                        />
                        <Route exact path = "/Philadelphia/"
                            render={props => 
                                <CityHome 
                                    city = "Philadelphia"
                                    cityPath = "Philadelphia"
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
