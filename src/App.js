import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './components/Header'

class App extends Component {

  goToLink() {
    this.props.history.push(`/${this.city.value}`)
  }

  render() {
    return (
      <div className="home">
        <Header 
          history = {this.props.history}
        />
        <div className="home-body">
          <div className="home-body-desc">
            <h3>Student Act is a forum to help you find events and oppurtunities to make change in your city! Search, post, and experience what it means to be a student activist.</h3>
          </div>
          <h2>Pick a city:</h2>
          <select className ="select-city" ref={(node) => this.city = node}>
            <option>Boston</option>
            <option>Chicago</option>
            <option>Nashville</option>
            <option selected="selected" value="NewYorkCity">New York City</option>
            <option>Philadelphia</option>
            <option>Wilmington</option>
          </select>
          <button  className="go-button" onClick={this.goToLink.bind(this)}>Go!</button>
        </div>
      </div>
    )
  }
}

export default App
