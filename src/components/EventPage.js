import React, { Component } from 'react'
import Header from './Header'
import '../styles/eventpage.css'
import { IntlProvider, FormattedDate } from 'react-intl'
import axios from 'axios'
import config from "../config.json"
import Moment from 'moment'

// var server = "http://localhost:8081"
var server = config.server

// TODO create Event doesnt exist page
class EventPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: this.props.city,
      cityPath: this.props.cityPath,
      title: this.props.location.state === undefined ? null : this.props.location.state.data.title,
      description: this.props.location.state === undefined ? null : this.props.location.state.data.description,
      location: this.props.location.state === undefined ? null : this.props.location.state.data.location,
      date: this.props.location.state === undefined ? null : this.props.location.state.data.date,
      image: this.props.location.state === undefined ? null : this.props.location.state.data.image,
      cause: this.props.location.state === undefined ? null : this.props.location.state.data.cause,
      link: this.props.location.state === undefined ? null : this.props.location.state.data.link,
      contact: this.props.location.state === undefined ? null : this.props.location.state.data.contact
    }
    this.getEventInfo = this.getEventInfo.bind(this)
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
	render() {
    Moment.locale('en')
    Moment().add(4, 'h')
		return (
			<div className="event-page">
				<Header 
					city = {this.state.city}
					cityPath = {this.state.cityPath}
					history = {this.props.history}
					// newCityState = {this.newCityState.bind(this)}
				/>
        <div className="event-page-header">
          <img className="header-image" src={this.state.image} onClick={()=> window.open(this.state.image, "_blank")}/>
          <h1 className="header-title">{this.state.title}</h1>
        </div>
        <div className="event-page-body">
          <span className="title">Date/Time: </span><span>{Moment(this.state.date).format('LLL')}</span><br/><br/>
          <span className="title">Location: </span>{this.state.location}<br/><br/>
          <span className="title">Cause: </span>{this.state.cause}<br/><br/>
          <span className="title">Description: </span><br/>{this.state.description}<br/><br/>
          <span className="title">Contact: </span>{this.state.contact}<br/><br/>
          {/* TODO make link work */}
          <div className="bottom-row">
            <a href={`${this.state.link}`}>{this.state.link}</a>
            <button>Back</button>
          </div>
        </div>
			</div>
		)
	}
}

export default EventPage