import React, { Component } from 'react'

class App extends Component {

  componentDidMount() {
    // var city = localStorage.getItem("default_city")
    // console.log(city)
    // if (city === null)
    //   this.props.history.push(`/NewYorkCity`)
    // else
    //   this.props.history.push(`/${city}`)
  }

  render() {
    return (
      <div className="home">
        Student Act version 1.0 will be released soon!
      </div>
    )
  }
}

export default App
