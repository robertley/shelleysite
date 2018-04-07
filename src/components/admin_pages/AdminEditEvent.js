import React, { Component } from 'react'
import axios from 'axios'
import Header from './../Header'
import '../../styles/createevent.css'
import config from "../../config.json"

// TODO Fix Date bug

// var server = "http://localhost:8081"
var server = config.server

class AdminEditEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            city: "admin",
            cityId: this.props.cityId,
            cityPath: this.props.cityPath,
            realCityPath: this.props.realCityPath,
            title: this.props.location.state === undefined ? "" : this.props.location.state.title,
            description: this.props.location.state === undefined ? "" : this.props.location.state.description,
            location: this.props.location.state === undefined ? "" : this.props.location.state.location,
            date: this.props.location.state === undefined ? "" : this.props.location.state.date,
            cause: this.props.location.state === undefined ? "" : this.props.location.state.cause,
            link: this.props.location.state === undefined ? "" : this.props.location.state.link,
            contact: this.props.location.state === undefined ? "" : this.props.location.state.contact,
            imageFileName: this.props.location.state === undefined ? "" : this.props.location.state.imageFileName,
            imageLink: this.props.location.state === undefined ? "" : this.props.location.state.imageLink,
            pleaseWait: false,
            imageUploadFailed: false,
            isSignedIn: false
        }
        this.handleImageUpload = this.handleImageUpload.bind(this)
        this.submitEvent = this.submitEvent.bind(this)
        this.deleteEvent = this.deleteEvent.bind(this)
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
    handleImageUpload(event) {
        // TODO image loading response
        event.preventDefault()
        this.setState({
            pleaseWait: true,
            imageUploadFailed: false
        })
        console.log(event.target.files[0])
        var reader = new FileReader()
        var file = event.target.files[0]
        var self = this
        reader.onload = function(upload) {
            self.setState({
                image: upload.target.result
            }, function() {
                self.postToImgur()
            })
        }
        reader.readAsDataURL(file)
    }

    hsubmit(event) {
        event.preventDefault()
    }

    postToImgur() {
        var imageToken = this.state.image.substring(23, (this.state.image.length-1))
        axios({
            method: 'POST',
            url: 'https://api.imgur.com/3/image',
            data: { 
                image: imageToken,
            },
            headers: {
                'Authorization' : 'Client-ID ac3937fa56fc7e1',
            }
        }).then(response => {
            console.log(response)
            this.setState({
                imageLink: response.data.data.link,
                pleaseWait: false
            })
        }).catch(error => {
            console.log(error)
            this.setState({
                pleaseWait: false,
                imageUploadFailed: true
            })
        })
    }

    pleaseWaitRender() {
        if (this.state.pleaseWait)
            return (
                <div className="please-wait">Image is uploading... please wait a second before submitting.</div>
            )
    }
    imageUploadFailedRender() {
        if (this.state.imageUploadFailed)
            return (
                <div className="upload-failed">Your image upload failed. Please try again or use a different image.</div>
            )
    }
    submitEvent(event) {
        event.preventDefault()
        console.log(this.title)
        var self = this
        axios({
            method: 'POST',
            url: `${server}/adminEditEvent`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: { 
                title: this.title.value.replace(/'/g, "\\'"), // 60 chars
                description: this.description.value.replace(/'/g, "\\'"), // 1000 chars
                location: this.location.value.replace(/'/g, "\\'"), // 60 char
                date: this.date.value, // DATETIME
                image: this.state.imageLink, // 120 chars
                city: this.state.cityId, // 2 int
                cause: this.cause.value.replace(/'/g, "\\'"), // 80 chars
                link: this.link.value, // 60 chars
                contact: this.contact.value.replace(/'/g, "\\'"), // 60 chars
                id: this.props.match.params.event_id
            }
        }).then(function (response) {
            self.props.history.push(`/admin/${self.state.realCityPath}`)
        }).catch(function (error) {
            console.log(error)
        })
    }
    deleteEvent() {
      if(window.confirm("Are you sure? This event will be premenently removed. FOREVER")) {
        var self = this
        axios({
          method: 'GET',
          url: `${server}/deleteEvent`,
          headers: { 
              eventId: self.props.match.params.event_id,
          }
        }).then(function (response) {
            self.props.history.push(`/admin/${self.state.realCityPath}`)
        }).catch(function (error) {
            console.log(error)
        })
      }
    }
    
    render() {
        if (this.state.isSignedIn)
        return (
            <div className="create-event">
                <Header 
                    city = {this.state.city}
                    cityPath = "admin"
                    //newCityState = {this.newCityState.bind(this)}
                    history = {this.props.history}
                />
                <div className="create-event-body">
                    <div className="create-event-header">
                        <span className="header-span">Create an Event </span><span className="required-desc1">*</span><span className="required-desc2"> - required</span>
                    </div>
                    <form onSubmit={this.submitEvent}>
                        <div className="forum-row-1">
                            <div className="forum-col-1">
                                <span>Title: </span><span className="required">*</span>
                                <input ref={(input) => {this.title = input}}  type="text" required defaultValue={this.state.title}/>
                            </div>
                            <div className="forum-col-2">
                                <p>Cause:</p>
                                <input ref={(input) => {this.cause = input}}  type="text" defaultValue={this.state.cause}/>
                            </div>
                            <div className="forum-col-date">
                                <span>Date/Time: </span><span className="required">* </span><span className="subtitle"> mm/dd/yyyy hh:mm AM/PM</span>
                                <input className="date-input" ref={(input) => {this.date = input}}  type="datetime-local" required defaultValue={this.state.date}/>
                            </div>
                        </div>
                        <div className="forum-row-2">
                            <p>Description:</p>
                            <textarea ref={(input) => {this.description = input}} defaultValue={this.state.description}/>
                        </div>
                        <div className="forum-row-3">
                            <div className="forum-col-1">
                                <span>Location: </span><span className="subtitle"> (Relative to {this.state.city})</span>
                                <input ref={(input) => {this.location = input}}  type="text" defaultValue={this.state.location}/>
                            </div>
                            <div className="forum-col-2">
                                <span>Link:</span><span className="subtitle"> (Website, Facebook event etc.)</span>
                                <input ref={(input) => {this.link = input}}  type="text" defaultValue={this.state.link}/>
                            </div>
                            <div className="forum-col-3">
                                <span>Contact:</span><span className="subtitle"> (Email, phone number etc.)</span>
                                <input ref={(input) => {this.contact = input}}  type="text" defaultValue={this.state.contact}/>
                            </div>
                        </div>
                        <div className="forum-row-4">
                            <p>Image:</p>
                            <input ref={(input) => this.image = input} type="file" accept="image/*" data-max-size="5000" onChange={this.handleImageUpload}/>
                            {this.pleaseWaitRender()}
                            {this.imageUploadFailedRender()}
                            <button type="submit">Finish and Approve</button>
                            <button type="button" className="remove-event-button" onClick={this.deleteEvent}>Remove Event</button>                        
                        </div>
                    </form>
                </div>
            </div>
        )
        else return null
    }
}

export default AdminEditEvent