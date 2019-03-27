import React, { Component } from 'react';
import logo from './logo.svg';
import SMSForm from './SMSForm';
import './Reminders.css';


class Reminders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      greeting: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitMsgList = this.handleSubmitMsgList.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
      .then(response => response.json())
      .then(state => this.setState(state));
  }

  // handleSubmitMsgList(event) {
  //   event.preventDefault();
  //   fetch(`/api/message-list?name=${encodeURIComponent(this.state.name)}`)
  //     .then(response => response.json())
  //     .then(state => this.setState(state));
  // }

  render() {
    console.log("Reminders.js Render", this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <SMSForm />
        </header>
      </div>
    );
  }
}

export default Reminders;