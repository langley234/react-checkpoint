import React from 'react';

class Email extends React.Component
{
    constructor(props)
    {
        super(props);
       
        this.state = {
            subject: props.data.subject,
            sender: props.data.sender,
            message: props.data.message,
            recipient: props.data.recipient,
            date: props.data.date
        };
        this.handleClickEvent = this.handleClickEvent.bind(this);
    }

    componentDidMount() {
    }
  
    componentWillUnmount() {        
    }

    handleClickEvent(){
        this.props.clickCallback(this.state);
    }

    render()
    {
        return (
            <li onClick={this.handleClickEvent}>{`${this.state.subject} : ${this.state.sender}`}</li>
        );
    }
}

export default Email;