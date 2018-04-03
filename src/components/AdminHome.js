import React, { Component } from 'react'
import Header from './Header'
import '../styles/admin.css'
import axios from 'axios'

var server = "http://localhost:8080"
// var server = "http://shelleysiteapi-env.us-west-2.elasticbeanstalk.com"

class AdminHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cityPath: "admin",
      city: "admin",
      isSignedIn: false,
      adminInfo: null
    }
    this.checkSignIn = this.checkSignIn.bind(this)
    this.renderWhenSignedIn = this.renderWhenSignedIn.bind(this)
    this.renderPendingEvents = this.renderPendingEvents.bind(this)
  }
  componentDidMount() {
    if (!this.state.isSignedIn)
      this.checkSignIn()
  }
  checkSignIn() { // TODO make more secure
    var self = this
    axios({
      method: 'GET',
      url: `${server}/checksigninadmin`,
      headers: { 
        token: localStorage.getItem("token")
      }
    }).then(function (response) {
        self.handleResponse(response.data)
    }).catch(function (error) {
        console.log(error)
    })
  }
  handleResponse(res) {
    console.log(res)
    if (!res.signedIn)
      this.props.history.push({
        pathname: `/admin/false`,
      })
    else {
      this.setState({
        isSignedIn: true
      })
      this.getAdminInfo()
    }
  }
  getAdminInfo() {
    var self = this
    axios({
      method: 'GET',
      url: `${server}/getAdminInfo`,
    }).then(function (response) {
        self.setState({
          adminInfo: response.data
        })
    }).catch(function (error) {
        console.log(error)
    })
  }
  renderWhenSignedIn() {
    if (this.state.isSignedIn) {
      return (
        <div>
          <Header
            cityPath = {this.state.cityPath}
            city = {this.state.city}
            history = {this.props.history}
          />
          <div className="admin">
            <div className="admin-header">
              <h2>Welcome Admin</h2>
            </div>
            {this.renderPendingEvents()}
          </div>
        </div>
      )
    }
  }
  renderPendingEvents() {
    if (this.state.adminInfo !== null)
      return (
        <div className="pending-events">
          <h3>Pending Events</h3>
          <span>New York City ({this.state.adminInfo[0].count})</span><br/><br/>
          <span>Philadelphia ({this.state.adminInfo[1].count})</span>
        </div>
      )
  }
  render() {
    return (
      <div>
        {this.renderWhenSignedIn()}
      </div>
    )
  }
}

export default AdminHome