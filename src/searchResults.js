import React from 'react';
import Email from './email.js';

class SearchResults extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            data: props.data
        }
    }

    render()
    {
        return (
            <div className="App">
              <header className="App-header">
                
                <div>
                    <ul>
                    
                        {this.state.data.map((item) => {
                            return <Email data={item} clickCallback={this.props.emailClickCallback}/>
                            // return <li onClick={this.props.clickCallback}>{`${item.subject} : ${item.sender}`}</li>
                        })}
                    </ul>
                </div>
                <div>
                  Search For Email
                  <form>
                    <label for="email-search-subject">Search Emails by Subject</label>
                    <input type="text" id="email-search-input"></input>
                  </form>
                  <button className="email-search-button" onClick={this.props.returnCallback}>
                    Return
                  </button>
                </div>
              </header>
              <div>
                <button className="Send-email-button" onClick={this.prepareEmailCallback}>
                  <h1>Send An Email</h1>
                </button>
              </div>
            </div>
          );
        
    }
}

export default SearchResults;