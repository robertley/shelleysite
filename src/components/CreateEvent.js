import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { imgur } from 'imgur'
import axios from 'axios'
import mysql from 'mysql'

class CreateEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: null,
            city: this.props.city
        }
        this.handleImageUpload = this.handleImageUpload.bind(this)
    }

    handleImageUpload(event) {
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
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
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
                city: this.state.city
            }
        }).then(function (response) {
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }
    
    render() {

        return (
            <div className="create-event">
                <div className="create-event-header">
                    <h2>Create an Event</h2>
                </div>
                <div className="create-event-body">
                    <form onSubmit={this.submitEvent.bind(this)}>
                        <p>Title:</p>
                        <input ref={(input) => {this.title = input}}  type="text"/>
                        <p>Description:</p>
                        <input ref={(input) => {this.description = input}}  type="text" />
                        <p>Location:</p>
                        <input ref={(input) => {this.location = input}}  type="text" />
                        <p>Date:</p>
                        <input ref={(input) => {this.date = input}}  type="datetime-local" />
                        <p>Image (optional)</p>
                        <input ref={(input) => this.image = input} type="file" accept="image/*" data-max-size="5000" onChange={this.handleImageUpload}/>
                        <button type="submit">Submit!</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateEvent