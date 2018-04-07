import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './../Header'
import '../../styles/admin.css'
import axios from 'axios'
import config from "../../config.json"

// var server = "http://localhost:8081"
var server = config.server

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
    console.log("getting admin info")
    var self = this
    axios({
      method: 'GET',
      url: `${server}/getAdminInfo`,
    }).then(function (response) {
      console.log(response)
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
          <h3>Pending Events:</h3>
          <Link to={{pathname: "/admin/NewYorkCity"}}>New York City ({this.state.adminInfo[0].count})</Link><br/><br/>
          <Link to={{pathname: "/admin/Philadelphia"}}>Philadelphia ({this.state.adminInfo[1] === undefined ? 0 : this.state.adminInfo[1].count})</Link>
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