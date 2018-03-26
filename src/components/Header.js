import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../styles/header.css'
import FaSearch from 'react-icons/lib/fa/search'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: this.props.city,
      cityPath: this.props.cityPath,
      toggled: false,
      firstLaunch: false
    }
    this.changeCityPhiladelphia = this.changeCityPhiladelphia.bind(this)
    this.changeCityNewYork = this.changeCityNewYork.bind(this)
    this.changeDontSeeCity = this.changeDontSeeCity.bind(this)
  }
  componentDidMount() {
    if (localStorage.getItem("new_user") === null && !this.state.firstLaunch)
      this.toggleFirstLaunch()
  }
  toggleFirstLaunch() {
    localStorage.setItem("new_user", 1)
    this.setState({
      firstLaunch: true
    })
  }
  getCity() {
    if (this.state.city !== undefined) {
      return this.state.city.toUpperCase()
    }
    return null
  }
  toggleDropdown() {
    if (this.state.toggled) {
      this.dropdown.classList.add('almostHidden')
      this.dropdown.classList.remove('visible')
      this.dropdownButton.classList.add('up')
      this.dropdownButton.classList.remove('down')
      const self = this
      setTimeout(function() { 
        if (self.dropdown !== null) {
          self.dropdown.classList.add('hidden')
          self.dropdown.classList.remove('almostHidden')
        }
      }, 700)
    }
    else {
      this.dropdown.classList.add('visible')
      this.dropdown.classList.remove('hidden')
      this.dropdownButton.classList.add('down')
      this.dropdownButton.classList.remove('up')
    }
    this.setState({
      toggled: !this.state.toggled
    })
  }
  changeCityPhiladelphia() {
    if (this.state.cityPath !== "Philadelphia") {
      this.props.history.push('/Philadelphia')
      if (this.props.newCityState !== undefined)
        this.props.newCityState('Philadelphia', 'Philadelphia', 2)
      this.setState({
        city: 'Philadelphia',
        cityPath: 'Philadelphia',
        toggled: false
      })
      this.toggleDropdown()
    }
  }
  changeCityNewYork() {
    if (this.state.cityPath !== "NewYorkCity") {
      this.props.history.push('/NewYorkCity')
      if (this.props.newCityState !== undefined)
        this.props.newCityState('New York City', 'NewYorkCity', 1)
      this.setState({
        city: 'New York City',
        cityPath: 'NewYorkCity',
        toggled: false
      })
      this.toggleDropdown()
    }
  }
  changeDontSeeCity() {
    this.props.history.push({
      pathname: '/DontSeeYourCity',
      state: { 
        cityPath: this.state.cityPath, 
        city: this.state.city 
      }
    })
    this.toggleDropdown()
  }
  renderFirstLaunchBubble() {
    if (this.state.firstLaunch)
      return (
        <div className="launch-message">
          <div class="arrow bottom right"></div>
            Pick a city and start making a difference!
        </div>
      )
  }
  renderDropdown() {
    if (this.state.cityPath === undefined) {
      return null
    }
    return (
      <span>
        <div className="header-city-dropdown-button up" ref={(node) => {this.dropdownButton = node}} onClick={this.toggleDropdown.bind(this)} />
          <ul className="header-city-dropdown hidden" ref={(node) => {this.dropdown = node}}>
            <li>Boston</li>
            <li>Chicago</li>
            <li>Nashville</li>
            <li onClick={this.changeCityNewYork}>New York City</li>
            <li onClick={this.changeCityPhiladelphia}>Philadelphia</li>
            <li>Wilmington</li>
            <li onClick={this.changeDontSeeCity}>Don't See Your City?</li>
          </ul>
          <div className="searchbar">
            <input type="text" placeholder={`Search events in ${this.state.city}`} />
            <div className="search-button">
              <FaSearch />
            </div>
          </div>
      </span>
    )
  }
  render() {
    // todo header scroll bug
    return (
      <div className="header">
        <div className="header-components">
          <Link to={{ pathname: `/${this.state.cityPath !== undefined ? this.state.cityPath : ""}`}}><h1 className="student-act">Student Act</h1></Link>
          <div className="header-item-city">
            <h3 onClick={this.toggleDropdown.bind(this)} >{this.getCity()}</h3>
          </div>
          {this.renderDropdown()}
          
          <div className="header-item1">
            <Link to={{ pathname: '/about', state: { cityPath: this.state.cityPath, city: this.state.city } }}><h2>About</h2></Link>
          </div>
          <div className="header-item2">
            <Link to={{ pathname: '/contact', state: { cityPath: this.state.cityPath, city: this.state.city }}}><h2>Contact</h2></Link>
          </div>
        </div>
        {this.renderFirstLaunchBubble()}
      </div>
    )
  }
}

export default Header