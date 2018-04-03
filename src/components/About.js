import React, { Component } from 'react'
import MarchWithoutWomen from '../photos/daywithoutwomen.JPG'
import Michelle from '../photos/IMG_7446.png'
import Header from './Header'

class About extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cityPath: this.props.location.state === undefined ? "NewYorkCity" : this.props.location.state.cityPath,
      city: this.props.location.state === undefined ? "New York City" : this.props.location.state.city
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
          {/* <div className="about-header">
              <h2>About</h2>
          </div> */}
          <div className="event-page-header">
            <img class="header-image" src={MarchWithoutWomen}/>
            <h1 className="about-title">About</h1>
          </div>
          <div className="about-body">
            <p className="about-text-top">Student Act's mission is to encourage college-aged 
              students to become activists in their community. 
              Founded on the belief that young adults are responsible
              for social and political change, Student Act creates a
              a fast and easy way to connect caring and prospective
              individuals, to events related to their interests. With
              the option for anyone to post events, Student Act is perfect
              for organizations looking for outreach and increased
              participation, as well as perfect for students looking to
              get involved.
              </p>
            <h3>Founder</h3>
            <div className="founder-info">
            {/* TODO links */}
              <p>Founder Michelle Ley is a student at The New School for Jazz
                and Contemporary Music in New York City.<br/><br/>
                Recently crowned Miss Manhattan 2018, Michelle is currently working
                on promoting her platform "Student Act: Promoting and Providing Activism 
                Opportunities," throughout the New York City area. In hopes of spreading 
                her message all across New York State, Michelle will be competing at the Miss 
                New York Pageant in June of 2018, an official state preliminary to Miss America.
                <br/><br/>
                Michelle was inspired to create Student Act from her own experiences as an activist
                in her school and community.
                <br/><br/>
                For more information about Michelle's platform or appearance requests, 
                you may contact her at missmanahattan18@gmail.com
              </p>
              <img class="about-image-2" src={Michelle}/>
            </div>
            <div className={"webdev-info"}>
              <p>This website was developed and designed by Robert Ley. 
                Inquires about web services can be sent to robert.ley94@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default About