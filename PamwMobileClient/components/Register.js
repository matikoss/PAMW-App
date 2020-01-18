import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import styles from './styles/styles';
import * as SecureStore from 'expo-secure-store';

class Register extends Component {
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

    onUsernameChange = (value) => {
        this.setState({ username: value });
    }

    onEmailChange = (value) => {
        this.setState({ email: value });
    }

    onPasswordChange = (value) => {
        this.setState({ password: value })
    }

    onSubmitRegister = async (event) => {
        event.preventDefault();
        const { username, email, password } = this.state;

        const errors = this.validateForm(username, email, password);
        if (errors.length > 0) {
            this.setState({ errors });
            this.setState({ added: null })
            return;
        }

        fetch('http://10.0.2.2:3000/register', {
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
                console.log(typeof (responseObject.username));
                const userId = responseObject.userId;
                const userName = responseObject.username;
                const accessToken = responseObject.accessToken;
                const refreshToken = responseObject.refreshToken;
                this.secureInStore(userId, userName, accessToken, refreshToken);
                const navigation = this.props.navigation;
                navigation.navigate('User');
            })
            .catch((error) => {
                console.log('error: ' + error);
                this.setState({ added: false });
            });
        this.setState({ errors: [] })

    }

    secureInStore = async (userId, userName, accessToken, refreshToken) => {
        await SecureStore.setItemAsync("userId", userId)
        await SecureStore.setItemAsync("userName", userName)
        await SecureStore.setItemAsync("accessToken", accessToken)
        await SecureStore.setItemAsync("refreshToken", refreshToken)
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
            registerInfo = <Text>Successfully registered!</Text>;
        }
        if (added === false) {
            registerInfo = <Text>User with this name or email already exists!</Text>
        }
        return (
            <View style={styles.mainView}>
                <Text style={styles.bigText}>Register:</Text>
                <TextInput
                    value={this.state.username}
                    onChangeText={this.onUsernameChange}
                    placeholder={'Username'}
                    style={styles.credentialsInput}
                />
                <TextInput
                    value={this.state.email}
                    onChangeText={this.onEmailChange}
                    placeholder={'Email'}
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
                    title={'Register'}
                    onPress={this.onSubmitRegister.bind(this)}
                />
                {errors.map(error => (
                    <Text style={styles.errorText} key={error}>Error: {error}</Text>
                ))}
                {registerInfo}
            </View>
        )
    }
}

export default Register;