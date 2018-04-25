import React, { Component } from "react"
import rebase, { auth } from "../re-base.js"
import "../css/Waiting.css"

class Waiting extends Component {

    // Constructor
    constructor() {
        super()
        this.state = {
            timerId: undefined,
            quitter: false
        }
    }

    // Set up timer
    componentWillMount = () => {
        window.addEventListener("beforeunload", this.stop.bind(this))
        this.listenref = rebase.listenTo(`/queue/${this.props.getAppState().user.uid}`, {
            context: this,
            then: (data) => {
                if (data !== this.props.getAppState().word) {
                    this.props.setAppState({inGame: true})
                    this.props.goToUrl("/draw")
                }
            }
        })
    }

    stop()  {
        rebase.removeBinding(this.listenref)
        this.props.goToUrl("/home")
        rebase.remove(`/queue/${this.props.getAppState().user.uid}`)
    }

    // Mandatory render method
    render() {
        return (
            <div>
                <div id="titleBar">
                    <div className="contentContainer" id="titleBarContent">
                        <p className="title_text" id="homescreenLogo" style={{marginTop: '0px'}}>Palindraw</p>
                    </div>
                </div>
                <center>
                    <p className="title_text" style={{marginTop: '70px'}}>Waiting for Another Player</p>
                    <button className="button" onClick={this.stop}>Quit</button>
                </center>
            </div>
        )
    }
}

export default Waiting
