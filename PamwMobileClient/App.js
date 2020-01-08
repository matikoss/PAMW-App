import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Welcome, Login, Register, Authentication, Home, UserMenu, Files } from './components'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

const UserBottomTab = createBottomTabNavigator({
  Home: Home,
  Files: Files,
  UserMenu: UserMenu
})
const NewUserStack = createStackNavigator({
  Welcome: Welcome,
  Login: Login,
  Register: Register
},
  { headerMode: 'none' }
)

const MainStack = createSwitchNavigator(
  {
    User: UserBottomTab,
    NewUser: NewUserStack,
    AuthLoad: Authentication
  },
  {
    initialRouteName: 'AuthLoad'
  }
)

const AppContainer = createAppContainer(MainStack)

export default class App extends Component {

  setCurrentUser = (id, user) => {
    this.setState({ userId: id, currentUser: user });
  }

  setTokens = (authToken, refreshToken) => {
    this.setState({ authToken: authToken, refreshToken: refreshToken });
  }


  render() {
    return (
      <AppContainer screenProps />
    );
  }
}
