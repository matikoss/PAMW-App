import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signup } from "../../actions/session"
import { setCookie } from "../../util/cookie"
import './RegistrationForm.css'

class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: [],
            added: null
        }
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitRegister = (event) => {
        event.preventDefault();

        const { username, email, password } = this.state;

        const errors = this.validateForm(username, email, password);
        if (errors.length > 0) {
            this.setState({ errors });
            this.setState({ added: null })
            return;
        }

        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                } else return response.json();
            })
            .then((responseObject) => {
                this.setState({ added: true });
                console.log(responseObject);
                console.log(typeof(responseObject.username));
                const userId = responseObject.userId;
                const userName = responseObject.username;
                const accessToken = responseObject.accessToken;
                const refreshToken = responseObject.refreshToken;
                console.log(userName)
                this.props.setCurrentUser(userId, userName);
                this.props.setTokens(accessToken, refreshToken);
                this.props.onRouteChange('files');
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ added: false });
            });
        this.setState({ errors: [] })
    }

    validateForm = (username, email, password) => {
        const errors = [];

        if (username.length === 0) {
            errors.push("Name can't be empty");
        }

        if (email.length < 5) {
            errors.push("Email should be at least 5 characters long");
        }

        if (email.split("").filter(character => character === "@").length !== 1) {
            errors.push("Email should contain '@'");
        }

        if (email.indexOf(".") === -1) {
            errors.push("Email should contain at least one dot");
        }

        if (password.length < 8) {
            errors.push("Password should be at least 8 characters long")
        }

        return errors;
    }

    render() {
        const { errors } = this.state;
        let added = this.state.added;
        let registerInfo = null;
        if (added === true) {
            registerInfo = <p className="register-success-info">Successfully registered!</p>;
        }
        if (added === false) {
            registerInfo = <p className="register-invalid-info">User with this name or email already exists!</p>
        }

        return (
            <div className="registration-form">
                <form>
                    <h1>Register</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input className="form-control" type="text" placeholder="Enter username" name="username" onChange={this.onUsernameChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input className="form-control" type="email" placeholder="Enter email" name="email" onChange={this.onEmailChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Password:</label>
                        <input className="form-control" type="password" placeholder="Enter password" name="pass" onChange={this.onPasswordChange} required />
                    </div>
                    <button onClick={this.onSubmitRegister} type="submit" className="register-btn">Register</button>
                    {errors.map(error => (
                        <p className="form-error" key={error}>Error: {error}</p>
                    ))}
                    {registerInfo}
                </form>
            </div>
        );
    }

}

export default RegistrationForm