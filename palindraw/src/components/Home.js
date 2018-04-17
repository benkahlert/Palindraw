import React, { Component } from "react"
import { auth } from "../re-base.js"
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
                <button onClick={this.draw}>DRAW</button>
                <Draw />
                <button onClick={this.signOut}>Sign out</button>
            </div>
        )
    }
}

export default Home