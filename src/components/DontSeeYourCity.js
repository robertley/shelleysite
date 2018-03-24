import React, { Component } from 'react'
import Header from './Header'

class DontSeeYourCity extends Component {

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
        <div className="dontseecity">
          <div className="dontseecity-header">
            <h2>Don't see your city?</h2> 
            <p>Student Act is working on expanding to more cities.
            Would you like us to include yours? Please send requests
            to studentactmail@gmail.com and we will try our best to 
            accomodate.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default DontSeeYourCity