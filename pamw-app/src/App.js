import React, { Component } from 'react';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import Files from './components/Files/Files';
import './App.css';

const initialState = {
  isSignedIn: false,
  route: 'signin'
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        {route === 'signin'
          ? <div>
            <RegistrationForm />
            <LoginForm />
          </div>
          : <Files />
        }
      </div>
    );
  }
}

export default App;
