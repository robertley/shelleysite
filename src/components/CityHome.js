import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import EventBox from './EventBox'
import Header from './Header'

// var server = "http://localhost:8080"
var server = "http://shelleysiteapi-env.us-west-2.elasticbeanstalk.com"

class CityHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      city: this.props.city,
      cityPath: this.props.cityPath,
      cityId: this.props.cityId,
      events: null
    }
    this.getEvents = this.getEvents.bind(this)
  }

  componentDidMount() {
    this.getEvents(this)
  }

  componentDidUpdate() {
    localStorage.setItem("default_city", `${this.state.cityPath}`)
  }

  getEvents(comp) {
    axios({
        method: 'GET',
        url: `${server}/getEvents/${this.state.cityPath}`,
        headers: {
            // 'Accept': 'application/json',
            // 'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': 'http://localhost:3000',
            // 'Access-Control-Allow-Methods': 'GET',
            // 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
        data: { 
            cityId: this.state.cityId
        }
    }).then(function (response) {
        console.log(response)
        comp.setState({
          events: response.data
        })
    }).catch(function (error) {
        console.log(error)
    })
    // comp.setState({
    //   events: [
    //     {
    //       title: "Fun event for good things",
    //       cause: "this is a cause",
    //       location: "Edtell office baby",
    //       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae neque eget lectus efficitur ullamcorper. Morbi odio tellus, laoreet ac dictum ac, hendrerit vitae urna. Suspendisse accumsan sapien velit, quis cursus mauris maximus nec. Praesent hendrerit sed arcu viverra venenatis. Nam vel dignissim tellus, volutpat vulputate erat. Mauris auctor pretium fermentum. In tincidunt ut ex ac pellentesque. Vivamus sit amet massa arcu. In tristique odio lacus, eget dictum tellus consectetur a. Nunc euismod, turpis sed ultricies sodales, leo sapien cursus elit, sit amet ornare lectus nunc eu nibh. Nulla ultrices sodales pretium. Nullam venenatis quam ac egestas condimentum. Phasellus lorem magna, congue id eleifend in, mattis id ex. Vestibulum rhoncus tincidunt libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Maecenas rutrum lorem a nunc rhoncus viverra.",
    //       contact: "foo@bar.com",
    //       image: "https://i.imgur.com/xMn78yX.png",
    //       id: 1
    //     }
    //   ]
    // })
    
  }
  renderEvents() {
    if (this.state.events === null) {
      return <div className="loading-container">Loading...</div>
    }
    else {
      const eventBoxes = this.state.events.map((eventData, index) => {
        return (
          <EventBox
            data = {eventData}
            key = {index}
            history ={this.props.history}
            cityPath = {this.state.cityPath}
          />
        )
      })
      return eventBoxes
    }
  }
  newCityState(city, cityPath, cityId) {
    this.setState({
      city: city,
      cityPath: cityPath,
      cityId: cityId,
      events: null
    })
  }

  render() {
    return (
      <div className="city-home">
        <Header 
          city = {this.state.city}
          cityPath = {this.state.cityPath}
          history = {this.props.history}
          newCityState = {this.newCityState.bind(this)}
        />
        <div className="city-home-body">
          <div className="body-header">
            <h2 className="events-h2">Events in {this.state.city}:</h2>
            <Link to={{ pathname: `/${this.state.cityPath}/CreateEvent/`}}><h2 className= "create-event-h2">Create event</h2></Link>
          </div>
          <div className="city-home-events">
            {this.renderEvents()}
          </div>
        </div>
      </div>
    )
  }
}

export default CityHome