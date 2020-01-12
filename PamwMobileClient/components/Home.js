import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import styles from './styles/styles';
import * as SecureStore from 'expo-secure-store';

const initialState = {
    username: null,
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
    }

    componentDidMount () {
        this.loadUsername();
    }

    loadUsername = async () => {
        SecureStore.getItemAsync("userName")
            .then((name) => {
                this.setState({ username: name })
            })
    }

    render() {
        let homeUserName = '';
        if (this.state.username !== null) {
            homeUserName = this.state.username;
        }
        return (
            <View style={styles.mainView}>
                <Text style={styles.bigText}>Welcome</Text>
            </View>
        )
    }
}

export default Home;