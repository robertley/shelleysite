import React, { Component } from 'react'
import MarchWithoutWomen from '../photos/daywithoutwomen.JPG'
import Michelle from '../photos/michelle.png'
import Header from './Header'

class About extends Component {

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
        <div className="about">
          <div className="about-header">
              <h2>About</h2>
          </div>
          <div className="about-body">
            <p>Student Act's mission is to encourage college-aged 
              students to become activists in their community. 
              Founded on the belief that young adults are responsible
              for social and political change, Student Act creates a
              a fast and easy way to connect caring and prospective
              individuals, to events related to their interests. With
              the option for anyone to post events, Student Act is perfect
              for organizations looking for outreach and increased
              participation.
              </p>
            <img class="about-image-1" src={MarchWithoutWomen}/>
            <h3>Founder</h3>
            <p>Founder Michelle Ley is a student at The New School for Jazz
              and Contemporary Music in New York City.
            </p>
            <img class="about-image-2" src={Michelle}/>
          </div>
        </div>
      </div>
    )
  }
}

export default About