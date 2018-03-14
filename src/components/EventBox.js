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
        {this.state.title}
        {this.state.city}
        {this.state.contact}
        {this.state.date}
        {this.state.description}
        {this.state.link}
        {this.state.title}
      </div>
    )
  }
}

export default EventBox