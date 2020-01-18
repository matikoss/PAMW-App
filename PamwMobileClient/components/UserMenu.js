import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import styles from './styles/styles';
import * as SecureStore from 'expo-secure-store';

const initialState = {
    username: '',
    userId: ''
}

class UserMenu extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
    }

    componentDidMount() {
        this.loadUsernameId();
    }

    onSubmitLogout = (event) => {
        event.preventDefault();
        fetch("http://10.0.2.2:3000/login", {
            method: 'delete',
            credentials: "include"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Problem with logout");
                } else return response.json();
            })
            .then((responseObject) => {
                console.log("Logged out user: " + responseObject.username)
                this.clearUserData();
                const navigation = this.props.navigation;
                navigation.navigate('AuthLoad');
            })
            .catch((error) => {
                console.log('error: ' + error);
            })
    }

    clearUserData = async () => {
        await SecureStore.deleteItemAsync("userName");
        await SecureStore.deleteItemAsync("userId");
        await SecureStore.deleteItemAsync("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");
    }

    loadUsernameId = async () => {
        const name = await SecureStore.getItemAsync("userName");
        const id = await SecureStore.getItemAsync("userId");
        this.setState({ username: name, userId: id })
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Text>Currenty logged:</Text>
                <Text>Username: {this.state.username}</Text>
                <Text>Id: {this.state.userId}</Text>
                <Button
                    title={'Log out'}
                    onPress={this.onSubmitLogout}
                />
            </View>
        )
    }
}

export default UserMenu;