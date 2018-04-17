import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import base, { auth } from "./re-base.js"
import Login from "./components/Login.js"

class App extends Component {

  constructor() {
    super()
    this.state = { 
      user: { },
      signedIn: false
    }
  }

  componentDidMount = () => {
    auth.onAuthStateChanged((user) => {
        if (user) {
            //Signed in
            this.setState({signedIn: true});
            console.log("Signed in!")
        } else {
            //Not signed in
            console.log("Signed out!")
        }
    });
  }

  getAppState = () => {
    return this.state
  }

  setAppState = (newState) => {
    this.setState(newState)
  }

  goToUrl = (url) => {
    this.props.history.push(url)
  }

  render() {

    const general = {
      getAppState: this.getAppState,
      setAppState: this.setAppState,
      goToUrl: this.goToUrl
    }

    return (
      <div className="App">
        <Login {...general} />
      </div>
    );
  }
}

export default App
