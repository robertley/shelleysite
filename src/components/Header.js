import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <div className="header">
        <div className="header-components">
          <Link to={{ pathname: '/'}}><h1 className="student-act">Student Act</h1></Link>
          <div className="header-item">
            <Link to={{ pathname: '/about'}}><h2>About</h2></Link>
          </div>
          <div className="header-item">
            <Link to={{ pathname: '/contact'}}><h2>Contact</h2></Link>
          </div>
        </div>
      </div>
    )
  }
}

export default Header