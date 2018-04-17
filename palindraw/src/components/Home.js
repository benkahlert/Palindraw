import React, { Component } from "react"
import base, { auth } from "../re-base.js"
import "../css/Home.css"

class Login extends Component {

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
                <button onClick={this.draw}>DRAW</button>
                <button onClick={this.signOut}>Sign out</button>
            </div>
        )
    }
}

export default Login