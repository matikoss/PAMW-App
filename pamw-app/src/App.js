import React, { Component } from 'react';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegistrationForm />
        <LoginForm />
      </div>
    );
  }
}

export default App;
