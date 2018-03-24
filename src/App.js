import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './components/Header'

class App extends Component {

  componentDidMount() {
    var city = localStorage.getItem("default_city")
    console.log(city)
    if (city === null)
      this.props.history.push(`/NewYorkCity`)
    else
      this.props.history.push(`/${city}`)
  }

  render() {
    return (
      <div className="home">
        
      </div>
    )
  }
}

export default App
