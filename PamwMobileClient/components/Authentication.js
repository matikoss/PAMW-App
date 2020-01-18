import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import styles from './styles/styles';
import * as SecureStore from 'expo-secure-store';

class Authentication extends Component {
    componentDidMount() {
        this.checkCookie()
    }

    checkCookie = async () => {
        const navigation = this.props.navigation;
        fetch("http://10.0.2.2:3000/login", {
            method: 'get',
            credentials: "include"
        })
            .then(response => response.json())
            .then((responseObject) => {
                console.log(responseObject);
                if (Object.keys(responseObject).length === 0 && responseObject.constructor === Object) {
                    navigation.navigate('NewUser');
                    return;
                } else {
                    let userId = responseObject.user.userId;
                    let userName = responseObject.user.username;
                    const accessToken = responseObject.user.accessToken;
                    const refreshToken = responseObject.user.refreshToken;
                    this.secureInStore(userId, userName, accessToken, refreshToken);
                    navigation.navigate('User');
                }
            })
    }

    secureInStore = async (userId, userName, accessToken, refreshToken) => {
        await SecureStore.setItemAsync("userId", userId)
        await SecureStore.setItemAsync("userName", userName)
        await SecureStore.setItemAsync("accessToken", accessToken)
        await SecureStore.setItemAsync("refreshToken", refreshToken)
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Text style={styles.bigText}>LOADING...</Text>
            </View>
        )
    }
}

export default Authentication;