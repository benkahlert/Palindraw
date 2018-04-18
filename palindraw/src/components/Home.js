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
                    this.props.goToUrl("/draw")
                }
            }
        })
    }

    signOut = () => {
        auth.signOut()
    }

    // Mandatory render method
    render() {

        const general = {
            getAppState: this.props.getAppState,
            setAppState: this.props.setAppState,
            goToUrl: this.props.goToUrl
        }

        return (
            <div>
                <Switch>
                    <Route exact path="/home" render={() => {
                        return (
                            <div>
                                <button onClick={this.draw}>DRAW</button>
                                <button onClick={this.signOut}>Sign out</button>
                            </div>
                        )
                    }}/>
                    <Route exact path="/waiting" render={() => {
                        return <Waiting {...general} />
                    }}/>
                    <Route exact path="/draw" render={() => {
                        return <Draw />
                    }}/>
                </Switch>
            </div>
        )
    }
}

export default Home