import React, { Component } from "react"
import base, { auth } from "../re-base.js"
import "../css/Login.css"

class Login extends Component {

    // Constructor
    constructor() {
        super()
        this.state = {
            emailAddressValue: "",
            passwordValue: "",
            errorText: "",
        }
    }

    // On email address change
    changeEmailAddress = (event) => {
        this.setState({emailAddressValue: event.target.value});
    }

    // On password change
    changePassword = (event) => {
        this.setState({passwordValue: event.target.value});
    }

    // Checks to see if string is valid email address
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Handle create account button clicked
    createAccount = (event) => {
        if (this.state.emailAddressValue === "" && this.validateEmail(this.state.emailAddressValue)) {
            this.setState({errorText: "Email address is poorly formatted"});
            return;
        }
        if (this.state.passwordValue === "") {
            this.setState({errorText: "Password is poorly formatted"});
            return;
        }
        auth.createUserWithEmailAndPassword(this.state.emailAddressValue, this.state.passwordValue)
        .then((user) => {
            const dataUser = {
                uid: user.uid,
                email: this.state.emailAddressValue,
                numWins: 0,
                numLosses: 0
            }
            base.post(`users/${user.uid}`, {
                data: dataUser
            })
        })
        .catch((error) => {
            console.log(error.message)
            this.setState({errorText: error.message});
        });
    }

    logIn = (event) => {
        auth.signInWithEmailAndPassword(this.state.emailAddressValue, this.state.passwordValue)
    }

    // Mandatory render method
    render() {
        return (
            <div id="containerDiv" style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '300px', justifyContent: 'center'}}>
                    <center><p className="title_text">Palindraw</p></center>
                    <center><div className="subtitle">Practice your Drawing Skills</div></center>
                    <input className="text_input" type="text" placeholder="Email address"
                    onChange={this.changeEmailAddress} value={this.emailAddressValue} />
                    <input className="text_input" type="password" placeholder="Password"
                    onChange={this.changePassword} value={this.passwordValue} />
                    <div>
                        <center>
                            <button className="button" onClick={this.createAccount}>Sign up</button>
                            <button className="button" onClick={this.logIn}>Log in</button>
                        </center>
                    </div>
                </div>


            </div>
        )
    }
}

export default Login
