import React, { Component } from 'react'
import Header from './Header'
import '../styles/eventpage.css'

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
  }
	render() {
    console.log(this.props.location.state)
		return (
			<div className="event-page">
				<Header 
					city = {this.state.city}
					cityPath = {this.state.cityPath}
					history = {this.props.history}
					// newCityState = {this.newCityState.bind(this)}
				/>
        <div className="event-page-header">
          <img className="header-image" src={this.state.image} />
          <h1 className="header-title">{this.state.title}</h1>
        </div>
        <div className="event-page-body">
          {this.state.cause}
        </div>
			</div>
		)
	}
}

export default EventPage