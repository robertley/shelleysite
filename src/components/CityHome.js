import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class CityHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      city: this.props.match.params.city_name
    }
  }

  render() {
    return (
      <div className="app">
        <div className="app-body">
          <h2>{this.state.city}</h2>
            <Link to={{ pathname: `CreateEvent/`}}><h2>Create event</h2></Link>
          <h2>View events</h2>
        </div>
      </div>
    )
  }
}

export default CityHome