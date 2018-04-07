import React, { Component } from 'react'
import Header from './../Header'
import '../../styles/admin.css'
import axios from 'axios'
import config from "../../config.json"

// var server = "http://localhost:8081"
var server = config.server

class Admin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cityPath: "admin",
      city: "admin",
      signInFailed: false
    }
    this.trySignIn = this.trySignIn.bind(this)
    this.incorrectPassword = this.incorrectPassword.bind(this)
  }
  componentDidMount() {
    this.checkSignIn()
  }
  checkSignIn() { // TODO make more secure
    if (localStorage.getItem("token") !== "") {
      var self = this
      axios({
        method: 'GET',
        url: `${server}/checksigninadmin`,
        headers: { 
          token: localStorage.getItem("token")
        }
      }).then(function (response) {
          self.handleResponse(response.data, true)
      }).catch(function (error) {
          console.log(error)
      })
    }
  }
  trySignIn() { // TODO make more secure
    if (this.password.value.length < 4) {
      this.setState({
        signInFailed: true
      })
    }
    else {
      var self = this
      axios({
        method: 'GET',
        url: `${server}/signinadmin`,
        headers: { 
          password: this.password.value
        }
      }).then(function (response) {
          self.handleResponse(response.data, false)
      }).catch(function (error) {
          console.log(error)
      })
    }
  }
  handleResponse(res, fromCheck) {
    console.log(res)
    if (res.signedIn) {
      localStorage.setItem("token", res.token)
      this.props.history.push({
        pathname: `/admin/true`,
      })
    }
    else if (!fromCheck) {
      this.setState({
        signInFailed: true
      })
      this.password.value = ""
    }
  }
  incorrectPassword() {
    if (this.state.signInFailed)
      return (
        <span className="incorrect-password">Incorrect Password</span>
      )
  }
  render() {
    return (
      <div>
        <Header
          cityPath = {this.state.cityPath}
          city = {this.state.city}
          history = {this.props.history}
        />
        <div className="admin">
          <div className="admin-header">
            <h2>Admin Login</h2>
            <div className="password">
                <span>Password: </span><input ref={(node) => {this.password = node}} type="password"/>
                <button onClick={this.trySignIn}>Submit</button><br/><br/>
                {this.incorrectPassword()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Admin