import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class CityHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      city: this.props.city,
      cityPath: this.props.cityPath,
      cityId: this.props.cityId
    }
  }

  componentDidMount() {
    this.getEvents()
  }

  getEvents() {
    axios({
        method: 'GET',
        url: `http://localhost:8080/getEvents/${this.state.cityPath}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: { 
            cityId: this.state.cityId
        }
    }).then(function (response) {
        console.log(response)
    }).catch(function (error) {
        console.log(error)
    })
}

  render() {
    return (
      <div className="city-home">
        <div className="city-home-body">
          <div className="body-header">
            <h2 className="events-h2">Events in {this.state.city}:</h2>
            <Link to={{ pathname: `${this.state.cityPath}/CreateEvent/`}}><h2 className= "create-event-h2">Create event</h2></Link>
          </div>
          <div className="city-home-events">
            <div className="event-box">
            </div>
            <div className="event-box">
            </div>
            <div className="event-box">
            </div>
            <div className="event-box">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CityHome