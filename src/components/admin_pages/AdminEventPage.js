import React, { Component } from 'react'
import Header from './../Header'
import '../../styles/eventpage.css'
import { Link } from 'react-router-dom'
import { IntlProvider, FormattedDate } from 'react-intl'
import axios from 'axios'
import config from "../../config.json"

// var server = "http://localhost:8081"
var server = config.server

class AdminEventPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "admin",
      cityPath: this.props.cityPath,
      realCityPath: this.props.realCityPath,
      title: this.props.location.state === undefined ? null : this.props.location.state.title,
      description: this.props.location.state === undefined ? null : this.props.location.state.description,
      location: this.props.location.state === undefined ? null : this.props.location.state.location,
      date: this.props.location.state === undefined ? null : this.props.location.state.date,
      image: this.props.location.state === undefined ? null : this.props.location.state.image,
      cause: this.props.location.state === undefined ? null : this.props.location.state.cause,
      link: this.props.location.state === undefined ? null : this.props.location.state.link,
      contact: this.props.location.state === undefined ? null : this.props.location.state.contact
    }
    this.getEventInfo = this.getEventInfo.bind(this)
    this.approveEvent = this.approveEvent.bind(this)
    this.editEvent = this.editEvent.bind(this)
    this.deleteEvent = this.deleteEvent.bind(this)
  }
  componentDidMount() {
    if (this.state.title === null) //if data wasn't carried over from CityHome
      this.getEventInfo()
  }
  getEventInfo() {
    var self = this
    axios({
      method: 'GET',
      url: `${server}/getEventById`,
      headers: { 
          eventId: this.props.match.params.event_id,
      }
    }).then(function (response) {
        self.setState({
          title: response.data[0].title,
          cause: response.data[0].cause,
          contact: response.data[0].contact,
          date: response.data[0].date,
          description: response.data[0].description,
          image: response.data[0].image,
          link: response.data[0].link,
          location: response.data[0].location
        })
    }).catch(function (error) {
        console.log(error)
    })
  }
  approveEvent() {
    var self = this
    axios({
      method: 'GET',
      url: `${server}/approveEvent`,
      headers: { 
          eventId: this.props.match.params.event_id,
      }
    }).then(function (response) {
        self.props.history.push(`/admin/${self.state.realCityPath}`)
    }).catch(function (error) {
        console.log(error)
    })
  }
  editEvent() {
    this.props.history.push({
        pathname: `/admin/${this.state.realCityPath}/EditEvent/${this.props.match.params.event_id}`,
        state: {
            title: this.state.title,
            description: this.state.description,
            location: this.state.location,
            date: this.state.date,
            imageLink: this.state.imageLink,
            city: this.state.cityId,
            cause: this.state.cause,
            link: this.state.link,
            contact: this.state.contact,
            imageFileName: this.props.location.state.imageFileName
        }
    })
  }
  deleteEvent() {
    if(window.confirm("Are you sure? This event will be premenently removed. FOREVER")) {
      var self = this
      axios({
        method: 'GET',
        url: `${server}/deleteEvent`,
        headers: { 
            eventId: self.props.match.params.event_id,
        }
      }).then(function (response) {
          self.props.history.push(`/admin/${self.state.realCityPath}`)
      }).catch(function (error) {
          console.log(error)
      })
    }
  }
	render() {
		return (
			<div className="event-page">
				<Header 
					city = {this.state.city}
					cityPath = {this.state.cityPath}
					history = {this.props.history}
					// newCityState = {this.newCityState.bind(this)}
				/>
        <div className="create-event-body">
          <div className="confirm-event">
              <div className="confirm-field"><span className="confirm-category">Title: </span><span>{this.state.title}</span></div>
              <div className="confirm-field"><span className="confirm-category">Cause: </span><span>{this.state.cause}</span></div>
              <div className="confirm-field"><span className="confirm-category">Date: </span><span>
                <IntlProvider locale="en">
                <FormattedDate 
                    value={this.state.date} 
                    day="numeric"
                    month="long"
                    year="numeric"
                    hour="numeric"
                    minute="numeric"/> 
                </IntlProvider></span></div>
              <div className="confirm-field"><span className="confirm-category">Description: <br/></span><span>{this.state.description}</span></div>
              <div className="confirm-field"><span className="confirm-category">Location: </span><span>{this.state.location}</span></div>
              <div className="confirm-field"><span className="confirm-category">Link: </span><span>{this.state.link}</span></div>
              <div className="confirm-field"><span className="confirm-category">Contact: </span><span>{this.state.contact}</span></div>
              <div className="confirm-field"><span className="confirm-category">Image:<br/></span><img src={this.state.image} alt=""/></div>
              <button onClick={this.approveEvent}>Approve</button>
              <button onClick={this.editEvent}>Edit</button>
              <button onClick={this.deleteEvent}>Reject (Delete Forever)</button>
          </div>
      </div>
    </div>
		)
	}
}

export default AdminEventPage