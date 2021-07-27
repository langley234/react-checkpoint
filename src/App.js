import logo from './logo.svg';
import './App.css';
import React from 'react';
import Email from './email'
import SendEmail from './sendEmail.js'
import NotLoaded from './notLoaded.js'
import SearchResults from './searchResults.js'

class App extends React.Component
{

  constructor(props)
  {
    super(props);

    this.state = {
      isLoaded: false,
      data: [],
      readingEmail: false,
      preparingEmail: false,
      sendingEmail: false,
      currentEmail: null,
      pendingSentEmail: null,
      emailSentSuccess: false,
      searchResults: []
    };

    this.loadData = this.loadData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.whenClickedCallback = this.whenClickedCallback.bind(this);
    this.returnFromReadingEmailCallback = this.returnFromReadingEmailCallback.bind(this);
    this.returnFromPreparingEmailCallback = this.returnFromPreparingEmailCallback.bind(this);
    this.prepareEmailCallback = this.prepareEmailCallback.bind(this);
    this.sendEmailButtonCallback = this.sendEmailButtonCallback.bind(this);
    this.sendEmailDoneCallback = this.sendEmailDoneCallback.bind(this);
    this.emailSentSuccess = this.emailSentSuccess.bind(this);
    this.searchCallback = this.searchCallback.bind(this);
    this.returnFromSearchCallback = this.returnFromSearchCallback.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() 
  {
    this.fetchData();
  }

  componentWillUnmount() {        
  }

  fetchData()
  {
    fetch("http://localhost:3001/emails")
      .then(res => res.json())
      .then(
        (result) => {
          let arr = [];
          for (let i = 0; i < result.length; i++) {
            arr.push(i);
          }
          this.setState({
            isLoaded: true,
            data: result        
          });
        },
        (error) => {
          console.log('ERROR');
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  whenClickedCallback(data)
  {
    console.log('data : ', data.message);
    this.setState({
      readingEmail: true,
      currentEmail: data
    });
  }

  returnFromReadingEmailCallback()
  {
    this.setState({
      readingEmail: false
    });
  }

  prepareEmailCallback()
  {
    this.setState({
      preparingEmail: true
    });
  }

  returnFromPreparingEmailCallback()
  {
    this.setState({
      preparingEmail: false
    });
  }

  searchCallback()
  {
    let searchCriteria = document.getElementById('email-search-input').value;
    
    let subjectArray = this.state.data.map(item => item.subject);
    let sortedArray = [];

    for (let i = 0; i < subjectArray.length; i++)
    {
      let copyString = subjectArray[i];
      copyString = copyString.toUpperCase();
      if (copyString.includes(searchCriteria.toUpperCase()))
      {
        sortedArray.push(this.state.data[i]);
      }
    }

    console.log('from searchCallback ', sortedArray);
    this.setState({
      searchResults: sortedArray
    });
  }

  sendEmailButtonCallback()
  {
    let subject = document.getElementById('email-subject-input').value;
    let recipient = document.getElementById('email-recipient-input').value;
    let message = document.getElementById('email-message').value;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}Z`
    let sender = "ME";

    today = `${yyyy}-${mm}-${dd}T${time}`

    let sendOut = {
      subject: subject,
      recipient: recipient,
      message: message,
      date: today,
      sender: sender
    }

    this.setState({
      sendingEmail: true,
      pendingSentEmail: sendOut
    });
  }

  sendEmailDoneCallback() {
    this.setState({
      sendingEmail: false,
      emailSentSuccess: true
    });
  }

  emailSentSuccess() {
    if (this.state.emailSentSuccess) {
      return (
        <h1>Email Sent</h1>
      );
    }
  }

  returnFromSearchCallback() {
    console.log('working');
    this.setState({
      isLoaded: false,
      searchResults: [],
      data: []
    });
  }

  loadData() 
  {
    if (this.state.isLoaded)
    {
      let senderArray = [];

      for (let i = 0; i < this.state.data.length; i++) {
        senderArray.push(this.state.data[i]);
      }
    
      return (
        <div>
          <h1>Emails</h1>
          <ul>
          {senderArray.map((item) => (
            <Email data={item} clickCallback={this.whenClickedCallback}/>
          ))}</ul> 
        </div>
      );
    }
      
    else
      return "No Data";
  }

  render()
  {
    if (!this.state.isLoaded)
    {
      return (
        <div>
          {this.fetchData()}
          {<NotLoaded />}
        </div>
      );
    }
    else if (this.state.isLoaded && !this.state.readingEmail && !this.state.preparingEmail && this.state.searchResults.length === 0)
    {
      return (
        <div className="App">
          <header className="App-header">
            
            <div>{this.loadData()}</div>
            <div>
              Search For Email
              <form>
                <label for="email-search-subject">Search Emails by Subject</label>
                <input type="text" id="email-search-input"></input>
              </form>
              <button className="email-search-button" onClick={this.searchCallback}>
                Search
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
    else if (this.state.isLoaded && !this.state.readingEmail && !this.state.preparingEmail && this.state.searchResults.length !== 0)
    {
      return (
        <div>
          {<SearchResults data={this.state.searchResults} emailClickCallback={this.whenClickedCallback} returnCallback={this.returnFromSearchCallback}/>}
        </div>
      );
    }
    else if (this.state.readingEmail)
    {
      return (
        <div className="Email-reader">
          <p>{`${this.state.currentEmail.message}`}</p>
          <button className="Return-button" onClick={this.returnFromReadingEmailCallback}>
            Click to Return
          </button>
        </div> 
      );
    }
    else if (this.state.preparingEmail && !this.state.sendingEmail)
    {
      return (
        <div className="Email-sender">
          <form>
            <label for="subject">Subject</label>
            <input type="text" id="email-subject-input"></input>
            <label for="recipient">Recipient</label>
            <input type="text" id="email-recipient-input"></input>
            <label for="message">Message</label>
            <input type="text" id="email-message"></input>
          </form>
          <button className="email-send-button" onClick={this.sendEmailButtonCallback}>
            Send
          </button>
          <button className="Return-from-send-button" onClick={this.returnFromPreparingEmailCallback}>
            Click to Return
          </button>
          <div>{this.emailSentSuccess()}</div>
        </div>
      );
    }
    else if (this.state.preparingEmail && this.state.sendingEmail)
    {
      return (
        <div className="Email-sender">
          <SendEmail data={this.state.pendingSentEmail} callBack={this.sendEmailDoneCallback}/>
        </div>
      );
    }
  }
}

export default App;
