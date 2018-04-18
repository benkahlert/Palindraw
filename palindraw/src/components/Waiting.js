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
        console.log("Mounting Waiting")
        const timerId = setInterval(this.ping, 1000)
        this.setState({"timerId": timerId})
    }

    // Ping server to see if someone has joined
    ping = () => {
        rebase.fetch(`/queue`, {
            context: this,
            then: (data) => {
                const found = data[this.props.getAppState().user.uid]
                console.log(found)
                if (found === undefined) {
                    // Someone wants to play
                    clearTimeout(this.state.timerId)
                    this.props.goToUrl("/draw")
                } else {
                    // Still waiting
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