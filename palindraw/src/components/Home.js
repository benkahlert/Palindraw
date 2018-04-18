import React, { Component } from "react"
import { auth } from "../re-base.js"
import { Route, Switch, Redirect } from "react-router-dom"
import Draw from "./Draw"
import "../css/Home.css"

class Home extends Component {

    // Constructor
    constructor() {
        super()
        this.state = {

        }
    }

    draw = () => {
        this.props.goToUrl("/draw")
    }

    signOut = () => {
        auth.signOut()
    }

    // Mandatory render method
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/home" render={() => {
                        return (
                            <div>
                                <button onClick={this.draw}>DRAW</button>
                                <button onClick={this.signOut}>Sign out</button>
                            </div>
                        )
                    }}/>
                    <Route path="/draw" render={() => {
                        return <Draw />
                    }}/>
                    <Route render={() => <Redirect to="/home" />} />
                </Switch>
            </div>
        )
    }
}

export default Home