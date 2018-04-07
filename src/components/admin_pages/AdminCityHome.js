import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from './../Header'
import config from "../../config.json"

// var server = "http://localhost:8081"
var server = config.server

class AdminCityHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      city: "admin",
      cityPath: this.props.cityPath,
      realCityPath: this.props.realCityPath,
      cityName: this.props.cityName,
      cityId: this.props.cityId,
      events: [],
      upcoming: true,
      newEvents: false,
      isSignedIn: false,
      loading: true
    }
    this.getEvents = this.getEvents.bind(this)
  }

  componentDidMount() {
    if (!this.state.isSignedIn)
      this.checkSignIn()
  }
  checkSignIn() { // TODO make more secure
    var self = this
    axios({
      method: 'GET',
      url: `${server}/checksigninadmin`,
      headers: { 
        token: localStorage.getItem("token")
      }
    }).then(function (response) {
        self.handleResponse(response.data)
    }).catch(function (error) {
        console.log(error)
    })
  }
  handleResponse(res) {
    console.log(res)
    if (!res.signedIn)
      this.props.history.push({
        pathname: `/admin/false`,
      })
    else {
      this.setState({
        isSignedIn: true
      })
      this.getEvents(this)
    }
  }
  getEvents(comp, cityId, upcoming) {
    var id = (cityId === undefined ? this.state.cityId : cityId)
    axios({
        method: 'GET',
        url: `${server}/getEvents`,
        headers: { 
            cityId: id,
            upcoming: "false",
            admin: "true"
        }
    }).then(function (response) {
        comp.setState({
          events: response.data,
          loading: false
        })
    }).catch(function (error) {
        console.log(error)
    })
    
  }
  renderEvents() {
    if (this.state.loading) {
      return <div className="loading-container">Loading...</div>
    }
    else {
      if (this.state.events.length > 0) {
        const eventBoxes = this.state.events.map((eventData, index) => {
          return (
            <li key={eventData.id}>
              <Link to={{pathname:`/admin/NewYorkCity/${eventData.id}`,
                state: {
                  cause: eventData.cause,
                  contact: eventData.contact,
                  date: eventData.date,
                  description: eventData.description,
                  image: eventData.image,
                  link: eventData.link,
                  location: eventData.location,
                  title: eventData.title
                }
                }}>{eventData.title}</Link>
            </li>
          )
        })
        return eventBoxes
      }
      else {
        return (
          <div>There are no events here. Wow!</div>
        )
      }
    }
  }
  renderWhenSignedIn() {
      return (
        <div>
        <Header 
          city = {this.state.city}
          cityPath = {this.state.cityPath}
          history = {this.props.history}
        />
        <div className="pending-events-cityhome">
          <h3>Pending Events in {this.state.cityName}</h3>
          <Link to={`/admin/${this.state.realCityPath}/CreateEvent`}><h3 className="create-event-link">Create Event</h3></Link>
          {this.renderEvents()}
        </div>
      </div>
      )
  }
  render() {
    return (
      <div>
        {this.renderWhenSignedIn()}
      </div>
    )
  }
}

export default AdminCityHome