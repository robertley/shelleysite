import React, { Component } from 'react'
import Header from './Header'

class Contact extends Component {
  render() {
    return (
      <div>
        <Header />
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