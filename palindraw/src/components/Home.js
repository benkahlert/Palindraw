import React, { Component } from "react"
import rebase, { auth } from "../re-base.js"
import { Route, Switch, Redirect } from "react-router-dom"
import Waiting from "./Waiting"
import Draw from "./Draw"
import "../css/Home.css"

class Home extends Component {

    // Constructor
    constructor() {
        super()
        this.state = {
            queue: { }
        }
    }

    draw = () => {
        // this.props.goToUrl("/draw")
        rebase.fetch(`/queue`, {
            context: this,
            asArray: true,
            then: (data) => {
                if (data.length == 1) {
                    // Nothing in queue
                    rebase.post(`/queue/${this.props.getAppState().user.uid}`, {
                        data: true,
                        then: () => {
                            this.props.goToUrl("/waiting")
                        }
                    })
                } else {
                    // Someone is waiting
                    
                }
            }
        })
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
                    <Route path="/waiting" render={() => {
                        return <Waiting />
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