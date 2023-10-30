import {useEffect, useState} from "react";
import {socket} from '../../index'
import {sendRequest} from "../../services/httpService";
import React from "react";

function Form() {
    const [emails, setEmails] = useState(0)
    const [sentEmails, setSentEmails] = useState(0)
    const [isSendingEmails, setIsSendingEmails] = useState(false)

    useEffect(() => {
        sendRequest({
        url: 'email/lastJob',
        method: 'get'
    }).then(response => setSentEmails(response.data))

        socket.then(socket => {
            socket.on("emailReport", (data) => {
                setIsSendingEmails(true)
                setSentEmails(data.messagesSent | 0)
                if (data.messagesSent === data.totalMessages) {
                    setIsSendingEmails(false)
                }
            })
        })
    }, [])


    const handleChange = (event) => {
        setEmails(event.target.value)
        event.preventDefault()
    }

    const handleSubmit = async (event) => {
        await sendRequest({url: 'email', method: 'post', data: {'numberOfEmails': emails}})
        event.preventDefault()
    }


    return (
        <form>
            <p>Type a number of emails to send</p>
            <input onChange={handleChange} value={emails} type="number"/>
            <button hidden={isSendingEmails} type="button" onClick={handleSubmit}>Send emails</button>
            <p>Total emails sent: {sentEmails}</p>
        </form>
    )

}

export default Form