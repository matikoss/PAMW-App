import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/session";
import './LoginForm.css'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            logged: null
        }
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitLogin = (event) => {
        const { username, password } = this.state;
        event.preventDefault();

        fetch('http://localhost:3000/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                } else return response.json();
            })
            .then((responseObject) => {
                this.setState({ logged: true });
                console.log(responseObject);
                const userId = responseObject.userId;
                const userName = responseObject.username;
                const accessToken = responseObject.accessToken;
                const refreshToken = responseObject.refreshToken;
                this.props.setCurrentUser(userId, userName);
                this.props.setTokens(accessToken, refreshToken);
                this.props.onRouteChange('files');
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ logged: false });
            })
    }

    render() {
        let logged = this.state.logged;
        let loginInfo = null;
        if (logged === true) {
            loginInfo = <p className="login-success-info">Logged in successfully!</p>;
        }
        if (logged === false) {
            loginInfo = loginInfo = <p className="login-invalid-info">Invalid login!</p>
        }

        return (
            <div className="login-form">
                <form>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input className="form-control" type="text" placeholder="Enter username" name="username" onChange={this.onUsernameChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass">Password:</label>
                        <input className="form-control" type="password" placeholder="Enter password" name="pass" onChange={this.onPasswordChange} required />
                    </div>
                    <button onClick={this.onSubmitLogin} type="submit" className="login-btn">Login</button>
                    {loginInfo}
                </form>
            </div>
        )
    }
}

export default LoginForm