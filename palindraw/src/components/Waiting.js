import React, { Component } from "react"
import rebase, { auth } from "../re-base.js"
import "../css/Waiting.css"

class Waiting extends Component {

    // Constructor
    constructor() {
        super()
        this.state = {
            timerId: undefined
        }
    }

    // Set up timer
    componentWillMount = () => {
        console.log("Mounting waiting")
        rebase.listenTo(`/queue/${this.props.getAppState().user.uid}`, {
            context: this,
            then: (data) => {
                if (data !== this.props.getAppState().word) {
                    this.props.setAppState({inGame: true})
                    this.props.goToUrl("/draw")
                }
            }
        })
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
                </center>
            </div>
        )
    }
}

export default Waiting
