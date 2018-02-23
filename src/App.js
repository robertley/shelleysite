import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class App extends Component {

  goToLink() {
    this.props.history.push(`/${this.city.value}`)
  }

  render() {
    return (
      <div className="home">
        <div className="home-body">
          <h2>Pick a city:</h2>
          <select ref={(node) => this.city = node}>
            <option>NYC</option>
            <option>Philadelphia</option>
          </select><br/>
          <button onClick={this.goToLink.bind(this)}>Go!</button>
        </div>
      </div>
    )
  }
}

export default App
