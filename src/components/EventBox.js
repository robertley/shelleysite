import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../eventbox.css'

class EventBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cause: this.props.data.cause,
      city: this.props.data.city,
      contact: this.props.data.contact,
      date: this.props.data.date,
      description: this.props.data.description,
      image: this.props.data.image,
      link: this.props.data.link,
      location: this.props.data.location,
      title: this.props.data.title
    }
  }
  render() {
    return (
      <div className="event-box">
        <div className="event-box-image">
          <img className="test" src={this.state.image} />
        </div>
        {/* TODO text overflow ... */}
        <h3 className="event-title">{this.state.title}</h3>
        <h3 className="event-date">March 28th, 3:00 PM</h3>
        <br/>
        <div className="row-2">
          <div className="event-cause"><span className="title">Cause: </span><span>{this.state.cause}</span></div>
          <div className="event-location"><span className="title">Location: </span><span>{this.state.location}</span></div>
        </div>
        <div className="row-3">
          {this.state.description}
        </div>
        <div className="row-4">
          <span className="title">Contact: </span><span>{this.state.contact}</span>
        </div>
      </div>
    )
  }
}

export default EventBox