import React, { Component } from 'react'
import Header from './Header'

class Contact extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cityPath: this.props.location.state === undefined ? "NewYorkCity" : this.props.location.state.cityPath,
      city: this.props.location.state === undefined ? "New York City" : this.props.location.state.city
    }
  }

  render() {
    return (
      <div>
        <Header
          cityPath = {this.state.cityPath}
          city = {this.state.city}
          history = {this.props.history}
        />
        <div className="contact">
          <div className="contact-header">
            <h2>Contact</h2>
            <div>
              {/* TODO make email clickable */}
              <span className="contact-stuff">For any questions concerns or comments you may contact us at studentactmail@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Contact