import {useState} from "react";
import {socket} from '../../index'
import {sendRequest} from "../../services/httpService";
import React from "react";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {emails: 0, sentEmails: 0}
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    async componentDidMount() {
        const sentEmails = (await sendRequest({
            url: 'email/lastJob',
            method: 'get'
        })).data;
        this.setState({sentEmails: sentEmails})

        socket.then(socket => {
            socket.on("emailReport", (data) => {
                this.setState({sentEmails: data.messagesSent | 0})
            })
        })
    }

    handleChange(event) {
        this.setState({emails: event.target.value})
        event.preventDefault()
    }

    async handleSubmit(event) {
        await sendRequest({url: 'email', method: 'post', data: {'numberOfEmails': this.state.emails}})
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>Type a number of emails to send</p>
                <input onChange={this.handleChange} value={this.state.emails} type="number"/>
                <button type="button" onClick={this.handleSubmit}>Send emails</button>
                <p>Total emails sent: {this.state.sentEmails}</p>
            </form>
        )
    }
}

export default Form