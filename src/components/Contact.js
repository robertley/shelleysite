import React, { Component } from 'react'
import Header from './Header'

class Contact extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cityPath: this.props.location.state.cityPath,
      city: this.props.location.state.city
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
          </div>
        </div>
      </div>
    )
  }
}

export default Contact