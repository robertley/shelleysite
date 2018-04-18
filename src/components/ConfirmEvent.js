import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Header from './Header'
import '../styles/createevent.css'
import config from "../config.json"
import { IntlProvider, FormattedDate } from 'react-intl'

// var server = "http://localhost:8081"
var server = config.server

class ConfirmEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            city: this.props.city,
            cityId: this.props.cityId,
            cityPath: this.props.cityPath,
            cityPathAdmin: this.props.cityPathAdmin,
            title: this.props.location.state.title,
            description: this.props.location.state.description,
            location: this.props.location.state.location,
            startDate: this.props.location.state.startDate,
            endDate: this.props.location.state.endDate,
            imageLink: this.props.location.state.imageLink,
            cause: this.props.location.state.cause,
            link: this.props.location.state.link,
            contact: this.props.location.state.contact,
            imageFileName: this.props.location.state.imageFileName,
            eventSubmitted: false,
            admin: this.props.admin,
            isSignedIn: false
        }
        this.submitEvent = this.submitEvent.bind(this)
        this.goBack = this.goBack.bind(this)
        this.adminSubmit = this.adminSubmit.bind(this)
    }
    componentDidMount() {
        if (!this.state.isSignedIn && this.state.admin)
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
        if (!res.signedIn)
          this.props.history.push({
            pathname: `/admin/false`,
          })
        else {
          this.setState({
            isSignedIn: true
          })
        }
    }

    submitEvent(event) {
        event.preventDefault()
        var self = this
        var admin = this.state.admin
        var isPosted = 0
        if (admin)
            isPosted = 1
        axios({
            method: 'POST',
            url: `${server}/createEvent`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: { 
                title: this.state.title.replace(/'/g, "\\'"), // 60 chars
                description: this.state.description.replace(/'/g, "\\'"), // 1000 chars
                location: this.state.location.replace(/'/g, "\\'"), // 60 char
                startDate: this.state.startDate, // DATETIME
                endDate: this.state.endDate, // DATETIME
                image: this.state.imageLink, // 120 chars
                city: this.state.cityId, // 2 int
                cause: this.state.cause.replace(/'/g, "\\'"), // 80 chars
                link: this.state.link, // 60 chars
                contact: this.state.contact.replace(/'/g, "\\'"), // 60 chars
                isPosted: isPosted
            }
        }).then(function (response) {
            if (admin)
                self.adminSubmit()
            else
                self.setState({
                    eventSubmitted: true
                })
        }).catch(function (error) {
            self.setState({ // TODO change behavior
                eventSubmitted: true
            })
            console.log(error)
        })
    }
    goBack() {
        var url
        if (this.state.admin)
            url = `/admin/${this.state.cityPath}/CreateEvent`
        else
            url = `/${this.state.cityPath}/CreateEvent`
        this.props.history.push({
            pathname: url,
            state: {
                title: this.state.title,
                description: this.state.description,
                location: this.state.location,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                imageLink: this.state.imageLink,
                city: this.state.cityId,
                cause: this.state.cause,
                link: this.state.link,
                contact: this.state.contact,
                imageFileName: this.props.location.state.imageFileName
            }
        })
    }
    adminSubmit() {
        this.props.history.push(`/admin/${this.state.cityPath}`)
    }
    renderBody() {
        if (!this.state.eventSubmitted) {
            return (
                <div className="create-event-body">
                    <div className="create-event-header">
                        <span className="header-span">Confirm Event</span>
                    </div>
                    <div className="confirm-event">
                        <div className="confirm-field"><span className="confirm-category">Title: </span><span>{this.state.title}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Cause: </span><span>{this.state.cause}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Date: </span><span>
                            <IntlProvider locale="en">
                            <FormattedDate 
                                value={this.state.startDate} 
                                day="numeric"
                                month="long"
                                year="numeric"
                                hour="numeric"
                                minute="numeric"/> 
                            </IntlProvider></span></div>
                        <div className="confirm-field"><span className="confirm-category">Description: <br/></span><span>{this.state.description}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Location: </span><span>{this.state.location}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Link: </span><span>{this.state.link}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Contact: </span><span>{this.state.contact}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Image:<br/></span><img src={this.state.imageLink} alt=""/></div>
                        <button onClick={this.goBack}>Edit Event</button>
                        <button onClick={this.submitEvent}>Submit</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="create-event-body">
                    <h1 className="thank-you">Thank You!</h1>
                    <h3>Your event is on it's way through our review process. It will be added to the {this.state.city} home page shortly.</h3>
                    <Link to={{ pathname: `/${this.state.cityPath}`}}><h3>Home</h3></Link>
                </div>
            )
        }
    }
    
    render() {
        if (!this.state.admin || this.state.isSignedIn)
        return (
            <div className="create-event">
                <Header 
                    city = {this.state.city}
                    cityPath = {this.state.cityPathAdmin}
                    //newCityState = {this.newCityState.bind(this)}
                    history = {this.props.history}
                />
                {this.renderBody()}
            </div>
        )
        else return null
    }
}

export default ConfirmEvent