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
                if (data !== true) {
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
                Waiting
            </div>
        )
    }
}

export default Waiting