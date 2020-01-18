import React, { Component } from 'react';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import Files from './components/Files/Files';
import './App.css';
import Welcome from './components/Welcome/Welcome';

const initialState = {
  userId: null,
  currentUser: null,
  authToken: null,
  refreshToken: null,
  route: 'welcome'
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  onRouteChange = (route) => {
    this.setState({ route: route });
    console.log(route);
  }

  setCurrentUser = (id, user) => {
    this.setState({ userId: id, currentUser: user });
    console.log(id);
    console.log(user);
    console.log(typeof (user));
  }

  setTokens = (authToken, refreshToken) => {
    this.setState({ authToken: authToken, refreshToken: refreshToken });
  }

  render() {
    const { route } = this.state;
    return (
      <div className="App">
        {route === 'welcome'
          ? <div>
            <Welcome onRouteChange={this.onRouteChange} setCurrentUser={this.setCurrentUser} setTokens={this.setTokens}/>
          </div>
          : (
            route === 'login'
              ? <LoginForm onRouteChange={this.onRouteChange} setCurrentUser={this.setCurrentUser} setTokens={this.setTokens} />
              : (
                route === 'register'
                  ? <RegistrationForm onRouteChange={this.onRouteChange} setCurrentUser={this.setCurrentUser} setTokens={this.setTokens} />
                  : <Files onRouteChange={this.onRouteChange} currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} setTokens={this.setTokens} accessToken={this.state.authToken} userId={this.state.userId} />
              )
          )
        }
      </div>
    );
  }
}

export default App;
