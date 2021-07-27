import React from 'react'
import logo from './logo.svg';

class NotLoaded extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
              </header>
            </div>
          );
    }
}

export default NotLoaded;