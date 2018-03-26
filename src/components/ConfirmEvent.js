import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { imgur } from 'imgur'
import axios from 'axios'
import Header from './Header'
import '../styles/createevent.css'

// var server = "http://localhost:8080"
var server = "http://shelleysiteapi-env.us-west-2.elasticbeanstalk.com"

class ConfirmEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            city: this.props.city,
            cityId: this.props.cityId,
            cityPath: this.props.cityPath,
            title: this.props.location.state.title,
            description: this.props.location.state.description,
            location: this.props.location.state.location,
            date: this.props.location.state.date,
            imageLink: this.props.location.state.imageLink,
            cause: this.props.location.state.cause,
            link: this.props.location.state.link,
            contact: this.props.location.state.contact,
            imageFileName: this.props.location.state.imageFileName,
            eventSubmitted: false
        }
        this.submitEvent = this.submitEvent.bind(this)
        this.goBack = this.goBack.bind(this)
    }


    submitEvent(event) {
        event.preventDefault()
        var self = this
        axios({
            method: 'POST',
            url: `${server}/createEvent`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: { 
                title: this.state.title, // 60 chars
                description: this.state.description, // 1000 chars
                location: this.state.location, // 60 char
                date: this.state.date, // DATETIME
                image: this.state.imageLink, // 120 chars
                city: this.state.cityId, // 2 int
                cause: this.state.cause, // 80 chars
                link: this.state.link, // 60 chars
                contact: this.state.contact // 60 chars
            }
        }).then(function (response) {
            console.log(response)
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
        this.props.history.push({
            pathname: `/${this.state.cityPath}/CreateEvent`,
            state: {
                title: this.state.title,
                description: this.state.description,
                location: this.state.location,
                date: this.state.date,
                imageLink: this.state.imageLink,
                city: this.state.cityId,
                cause: this.state.cause,
                link: this.state.link,
                contact: this.state.contact,
                imageFileName: this.props.location.state.imageFileName
            }
        })
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
                        <div className="confirm-field"><span className="confirm-category">Date: </span><span>{this.state.date}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Description: <br/></span><span>{this.state.description}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Location: </span><span>{this.state.location}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Link: </span><span>{this.state.link}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Contact: </span><span>{this.state.contact}</span></div>
                        <div className="confirm-field"><span className="confirm-category">Image:<br/></span><img src={this.state.imageLink} alt=""/></div>
                        <button onClick={this.goBack}>Edit Event</button>
                        <button onClick={this.submitEvent}>Submit!</button>
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

        return (
            <div className="create-event">
                <Header 
                    city = {this.state.city}
                    cityPath = {this.state.cityPath}
                    //newCityState = {this.newCityState.bind(this)}
                    history = {this.props.history}
                />
                {this.renderBody()}
            </div>
        )
    }
}

export default ConfirmEvent