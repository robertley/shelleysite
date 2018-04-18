import React, { Component } from 'react'
import '../styles/eventbox.css'
import { IntlProvider, FormattedDate } from 'react-intl'

class EventBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cause: this.props.data.cause,
      city: this.props.data.city,
      contact: this.props.data.contact,
      date: this.props.data.start_date,
      // date: "March 28th, 3:00 PM",
      description: this.props.data.description,
      image: this.props.data.image,
      link: this.props.data.link,
      location: this.props.data.location,
      title: this.props.data.title,
      id: this.props.data.id,
      cityPath: this.props.cityPath
    }
  }
  goToEventPage() {
    this.props.history.push({
      pathname: `${this.state.cityPath}/event/${this.state.id}`,
      state: {
        data: this.state
      }
    })
  }
  renderContact() {
    if (this.state.contact !== "")
      return (
        <span><span className="title">Contact: </span>{this.state.contact}</span>
      )
    else return null
  }
  renderCause() {
    if (this.state.cause !== "")
      return (
        <div className="event-cause"><span className="title">Cause: </span><span>{this.state.cause}</span></div>
      )
    else return null
  }
  renderLocation() {
    if (this.state.location !== "")
      return (
        <div className="event-location"><span className="title">Location: </span><span>{this.state.location}</span></div>
      )
    else return null
  }
  render() {
    return (
      <div className="event-box" onClick={this.goToEventPage.bind(this)}>
        <div className="event-box-image">
          <img className="test" src={this.state.image} alt="image_"/>
        </div>
        {/* TODO text overflow ... */}
        <h3 className="event-title">{this.state.title}</h3>
        <IntlProvider locale="en"><h3 className="event-date">
          <FormattedDate 
            value={this.state.date} 
            day="numeric"
            month="long"
            year="numeric"
            hour="numeric"
            minute="numeric"/> 
          </h3></IntlProvider>
        <br/>
        <div className="row-2">
          {this.renderCause()}
          {this.renderLocation()}
        </div>
        <div className="row-3">
          {this.state.description}
        </div>
        <div className="row-4">
          {this.renderContact()}
        </div>
      </div>
    )
  }
}

export default EventBox