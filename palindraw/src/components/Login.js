
import React, { Component } from "react"
import base, { auth } from "../re-base.js"
import "../css/Login.css"

class Login extends Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            firstNameValue: "",
            lastNameValue: "",
            emailAddressValue: "",
            passwordValue: "",
            usernameValue: "",
            errorText: "",
        }
    }

    // On first name change
    changeFirstName = (event) => {
        this.setState({firstNameValue: event.target.value});
    }

    // On last name change
    changeLastName = (event) => {
        this.setState({lastNameValue: event.target.value});
    }

    // On email address change
    changeEmailAddress = (event) => {
        this.setState({emailAddressValue: event.target.value});
    }

    // On password change
    changePassword = (event) => {
        this.setState({passwordValue: event.target.value});
    }

    // On username change
    changeUsername = (event) => {
        this.setState({usernameValue: event.target.value})
    }

    // Handle create account button clicked
    createAccount = (event) => {
        if (this.state.firstNameValue === "") {
            this.setState({errorText: "First name is badly formatted."});
            return;
        }
        if (this.state.lastNameValue === "") {
            this.setState({errorText: "Last name is badly formatted."});
            return;
        }
        if (this.state.usernameValue === "") {
            this.setState({errorText: "Username is badly formatted"});
            return;
        }
        auth.createUserWithEmailAndPassword(this.state.emailAddressValue, this.state.passwordValue)
        .then((user) => {
            const dataUser = {
                uid: user.uid,
                email: this.state.emailAddressValue,
                firstName: this.state.firstNameValue,
                lastName: this.state.lastNameValue,
                username: this.state.usernameValue
            }
            this.initializeUser(dataUser);
            this.props.setUser(dataUser);
            this.props.setSignedIn(true);
            localStorage.setItem("user", JSON.stringify(dataUser));
            localStorage.setItem("signedIn", true);
            this.props.goToUrl("/");
        })
        .catch((error) => {
            this.setState({errorText: error.message});
        });
    }

    // Initializes user in firebase
    initializeUser = (user) => {
        base.post(`users/${user.uid}`, {
            data: user
        });
    }

    // Mandatory render method
    render() {
        return (
            <div>
                <input type="text" placeholder="Email address" 
                onChange={this.changeEmailAddress} value={this.emailAddressValue} />
                <input type="text" placeholder="Password" 
                onChange={this.changePassword} value={this.passwordValue} />
            </div>
        )
    }
}

export default Login