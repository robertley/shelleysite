import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { imgur } from 'imgur'
import axios from 'axios'
import Header from './Header'
import '../createevent.css'

class CreateEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            city: this.props.city,
            cityId: this.props.cityId,
            cityPath: this.props.cityPath
        }
        this.handleImageUpload = this.handleImageUpload.bind(this)
    }

    handleImageUpload(event) {
        // TODO image loading response
        event.preventDefault()
        console.log(event.target.files[0])
        var reader = new FileReader()
        var file = event.target.files[0]
        var self = this
        reader.onload = function(upload) {
            self.setState({
                image: upload.target.result
            }, function() {
                console.log(self.state.image);
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
                image: response.data.data.link
            })
        }).catch(error => {
            console.log(error)
        })
    }

    submitEvent(event) {
        event.preventDefault()
        console.log("event submitted")
        console.log(this.title.value)
        axios({
            method: 'POST',
            url: 'http://localhost:8080/createEvent',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: { 
                title: this.title.value,
                description: this.description.value,
                location: this.location.value,
                date: this.date.value,
                image: this.state.image,
                city: this.state.cityId,
                cause: this.cause.value,
                link: this.link.value,
                contact: this.contact.value
            }
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }

    newCityState(city, cityPath, cityId) {
        
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
                <div className="create-event-body">
                    <div className="create-event-header">
                        <span className="header-span">Create an Event </span><span className="required-desc1">*</span><span className="required-desc2"> - required</span>
                    </div>
                    <form onSubmit={this.submitEvent.bind(this)}>
                        <div className="forum-row-1">
                            <div className="forum-col-1">
                                <span>Title: </span><span className="required">*</span>
                                <input ref={(input) => {this.title = input}}  type="text" required/>
                            </div>
                            <div className="forum-col-2">
                                <p>Cause:</p>
                                <input ref={(input) => {this.cause = input}}  type="text" />
                            </div>
                            <div className="forum-col-date">
                                <span>Date: </span><span className="required">* </span><span className="subtitle"> mm/dd/yyyy hh:mm AM/PM</span>
                                <input className="date-input" ref={(input) => {this.date = input}}  type="datetime-local" required/>
                            </div>
                        </div>
                        <div className="forum-row-2">
                            <p>Description:</p>
                            <textarea ref={(input) => {this.description = input}} />
                        </div>
                        <div className="forum-row-3">
                            <div className="forum-col-1">
                                <span>Location: </span><span className="subtitle"> (Relative to {this.state.city})</span>
                                <input ref={(input) => {this.location = input}}  type="text" />
                            </div>
                            <div className="forum-col-2">
                                <span>Link:</span><span className="subtitle"> (Website, Facebook event etc.)</span>
                                <input ref={(input) => {this.link = input}}  type="text" />
                            </div>
                            <div className="forum-col-3">
                                <span>Contact:</span><span className="subtitle"> (Email, phone number etc.)</span>
                                <input ref={(input) => {this.contact = input}}  type="text" />
                            </div>
                        </div>
                        <div className="forum-row-4">
                            <p>Image:</p>
                            <input ref={(input) => this.image = input} type="file" accept="image/*" data-max-size="5000" onChange={this.handleImageUpload}/>
                            <button type="submit">Submit!</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateEvent