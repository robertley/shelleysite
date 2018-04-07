import React, { Component } from 'react'
import Header from './../Header'
import '../../styles/admin.css'

class Unauthorized extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cityPath: "admin",
      city: "admin"
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
          <div className="admin">
            <div className="admin-header">
              <h3>You are unauthorized to view this page.</h3>
            </div>
          </div>
        </div>
      )
  }
}

export default Unauthorized