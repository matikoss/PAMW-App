import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import styles from './styles/styles';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            logged: null
        }
    }

    onUsernameChange = (value) => {
        this.setState({ username: value});
    }

    onPasswordChange = (value) => {
        this.setState({ password: value});
    }

    onSubmitLogin = async (event) => {
        event.preventDefault();
        
        fetch('http://10.0.2.2:3000/login', {
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
                this.secureInStore(userId, userName, accessToken, refreshToken);
                const navigation = this.props.navigation;
                console.log(this.state.logged);
                navigation.navigate('User');
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ logged: false });
            })
    }

    secureInStore = async (userId, userName, accessToken, refreshToken) => {
        await SecureStore.setItemAsync("userId", userId)
        await SecureStore.setItemAsync("userName", userName)
        await SecureStore.setItemAsync("accessToken", accessToken)
        await SecureStore.setItemAsync("refreshToken", refreshToken)
    }

    render() {
        let logged = this.state.logged;
        let loginInfo = null;
        if (logged === true) {
            loginInfo = <Text>Logged in successfully!</Text>;
        }
        if (logged === false) {
            loginInfo = <Text>Invalid login!</Text>;
        }
        return (
            <View style={styles.mainView}>
                <Text style={styles.bigText}>Login:</Text>
                <TextInput
                    value={this.state.username}
                    onChangeText={this.onUsernameChange}
                    placeholder={'Username ( ͡° ͜ʖ ͡°)'}
                    style={styles.credentialsInput}
                />
                <TextInput
                    value={this.state.password}
                    onChangeText={this.onPasswordChange}
                    placeholder={'Password'}
                    secureTextEntry={true}
                    style={styles.credentialsInput}
                />
                <Button
                    title={'Login'}
                    onPress={this.onSubmitLogin.bind(this)}
                />
                {loginInfo}
            </View>
        )
    }
}
export default Login;