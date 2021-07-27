import React from 'react';

class SendEmail extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            subject: props.data.subject,
            recipient: props.data.recipient,
            message: props.data.message,
            sender: props.data.sender,
            date: props.data.date,
            id: 1,
            done: false,
            callBack: props.callBack
        }
    }
  
    componentDidMount() {
        const url = "http://localhost:3001/send";
        const postBody = {
            sender: this.state.subject,
            recipient: this.state.recipient,
            subject: this.state.subject,
            message: this.state.message,
            date: this.state.date,
            id: this.state.id
        }
        
        let translated = JSON.stringify(postBody);
        console.log('TRANSLATED : ', translated);
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };

        fetch(url, requestMetadata)
            .then(res => res.json())
            .then(recipes => {
                this.setState({
                    done: true
                })
            });            
    }

    render()
    {
        if (!this.state.done)
        {
            return (
                <h1>Placeholder text</h1>
            );
        }
        else if (this.state.done)
        {
            return (
                <h1>{this.state.callBack()}</h1>
            );
        }
    }
}

export default SendEmail;