import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import { Route, Switch, Redirect } from "react-router-dom"
import base, { auth } from "./re-base.js"
import Login from "./components/Login.js"
import Home from "./components/Home.js"

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
            this.goToUrl("/Home")
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
      <Switch>
        <Route path="/" render={() => {
          if (!this.state.signedIn) {
            return <Login {...general} />
          } else {
            return <Home {...general} />
          }
        }}/>
      </Switch>
    );
  }
}

export default App
