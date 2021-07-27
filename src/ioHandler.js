import React from 'react'

class IOHandler extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: null,
        };

       // props.loadJSONCallback;
    }

    loadJSONData(url)
    {
        console.log(this.props.loadCallback);
        console.log('hello form here');
        //console.log('http://localhost:3001/emails');
         fetch('http://localhost:3001/emails')
           .then(res => res.json())
           .then(res => this.setState({
                data: res
           }));
    }

    render()
    {
        if (this.state.data === null)
        {
            return (
                <h1>Hello There</h1>
            );
        }
        return (
            <div>{this.state.data}</div>
        );
    }
}

export default IOHandler;