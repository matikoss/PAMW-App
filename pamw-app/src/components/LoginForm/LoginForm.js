import React, { Component } from 'react';
import './LoginForm.css'

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: [],
        }
    }

    onUsernameChange = (event) => {
        this.setState({ username: event.target.value });
    }

    onPasswordChange = (event) => {
        this.setState({ password: event.target.value })
    }

    onSubmitLogin = (event) => {

    }

    render() {
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
                </form>
            </div>
        )
    }
}

export default LoginForm