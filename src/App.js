import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-body">
          <h1>Pick a city:</h1>
          <Link to={{ pathname: "/nyc/" }}><h3>NYC</h3></Link>
        </div>
      </div>
    )
  }
}

export default App
