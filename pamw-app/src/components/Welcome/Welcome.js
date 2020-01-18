import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'

class Welcome extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.checkCookie()
    }

    onRegisterClick = () => {
        this.props.onRouteChange('register');
    }
    onLoginClick = () => {
        this.props.onRouteChange('login');
    }

    checkCookie = () => {
        fetch("http://localhost:3000/login", {
            method: 'get',
            credentials: "include"
        })
            .then(response => response.json())
            .then((responseObject) => {
                console.log(responseObject);
                if (Object.keys(responseObject).length === 0 && responseObject.constructor === Object) {
                    return;
                } else {
                    let userId = responseObject.user.userId;
                    let userName = responseObject.user.username;
                    const accessToken = responseObject.user.accessToken;
                    const refreshToken = responseObject.user.refreshToken;
                    this.props.setCurrentUser(userId, userName);
                    this.props.setTokens(accessToken, refreshToken);
                    this.props.onRouteChange('files');
                }
            })
    }

    render() {
        return (
            <div className="welcome-div">
                <h1>Welcome!</h1>
                <button  onClick={this.onRegisterClick} type="button" className="btn btn-warning welcome-button">Register</button>
                <button  onClick={this.onLoginClick} type="button" className="btn btn-success welcome-button">Login</button>
            </div>
        )
    }
}
export default Welcome;