import React, { Component } from "react"
import rebase, { auth } from "../re-base.js"
import { Route, Switch, Redirect } from "react-router-dom"
import Waiting from "./Waiting"
import Gallery from "./Gallery"
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
        
        const words = ['Racecar', 'Kayak', 'Noon']
        const word = words[Math.floor(Math.random() * words.length)]

        rebase.fetch(`/queue`, {
            context: this,
            then: (data) => {
                const dataArray = Object.keys(data)
                if (dataArray.length == 1) {
                    // Nothing in queue
                    rebase.post(`/queue/${this.props.getAppState().user.uid}`, {
                        data: word,
                        then: () => {
                            this.props.setAppState({word: word})
                            this.props.goToUrl("/waiting")
                        }
                    })
                } else {
                    // Someone is waiting
                    const keys = Object.keys(data)
                    let key = keys[0]
                    if (keys[0] === "example") {
                        key = keys[1]
                    }
                    rebase.remove(`/queue/${key}`, (error) => {
                        if (error !== null) {
                            console.log(error)
                        }
                    })
                    this.props.setAppState({inGame: true})
                    this.props.setAppState({word: data[key]})
                    this.props.setAppState({opponentId: key})
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

        console.log(this.props.getAppState())

        return (
            <div>
                <Switch>
                    <Route exact path="/home" render={() => {
                        return (
                            <div>
                                <div id="titleBar">
                                    <div className="contentContainer" id="titleBarContent">
                                        <p className="title_text" id="homescreenLogo" style={{marginTop: '0px'}}>Palindraw</p>
                                        <div className="row" id="titleRightInfo">
                                            <p className="text_description" id="titleBarName">{this.props.getAppState().user.email}</p>
                                            <button className="button" id="playButton" onClick={this.draw}>PLAY</button>
                                            <div className="statsBox">
                                                <p className="statsInfo">🎉 {this.props.getAppState().user.numWins}</p>
                                            </div>
                                            <div className="statsBox">
                                                <p className="statsInfo">😔 {this.props.getAppState().user.numLosses}</p>
                                            </div>
                                            <button className="button" id="signOutButton" onClick={this.signOut}>Sign out</button>
                                        </div>
                                    </div>
                                </div>

                                <Gallery { ...general } />
                            </div>
                        )
                    }}/>
                    <Route exact path="/waiting" render={() => {
                        return <Waiting { ...general } />
                    }}/>
                    <Route exact path="/draw" render={() => {
                        return <Draw { ...general } />
                    }}/>
                </Switch>
            </div>
        )
    }
}

export default Home
