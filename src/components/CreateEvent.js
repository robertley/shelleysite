import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { imgur } from 'imgur'
import axios from 'axios'
import Header from './Header'
import '../styles/createevent.css'

class CreateEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            city: this.props.city,
            cityId: this.props.cityId,
            cityPath: this.props.cityPath,
            title: this.props.location.state === undefined ? "" : this.props.location.state.title,
            description: this.props.location.state === undefined ? "" : this.props.location.state.description,
            location: this.props.location.state === undefined ? "" : this.props.location.state.location,
            date: this.props.location.state === undefined ? "" : this.props.location.state.date,
            image: this.props.location.state === undefined ? "" : this.props.location.state.image,
            cause: this.props.location.state === undefined ? "" : this.props.location.state.cause,
            link: this.props.location.state === undefined ? "" : this.props.location.state.link,
            contact: this.props.location.state === undefined ? "" : this.props.location.state.contact,
            imageFileName: this.props.location.state === undefined ? "" : this.props.location.state.imageFileName
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

    newCityState(city, cityPath, cityId) {
        
    }

    goToConfirm() {
        if (this.title.value !== "" && this.date.value !== "")
            this.props.history.push({
                pathname: `/${this.state.cityPath}/ConfirmEvent`,
                state: {
                    title: this.title.value,
                    description: this.description.value,
                    location: this.location.value,
                    date: this.date.value,
                    image: this.state.image,
                    imageFileName: this.image.value,
                    city: this.state.cityId,
                    cause: this.cause.value,
                    link: this.link.value,
                    contact: this.contact.value
                }
            })
    }

    nothing() {

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
                    <form>
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
                            <button type="button" onClick={this.goToConfirm.bind(this)}>Finish</button>                        
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateEvent