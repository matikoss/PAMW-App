import React, { Component } from 'react';
import { View, TextInput, Text, Button } from 'react-native';
import styles from './styles/styles';
import * as SecureStore from 'expo-secure-store';

const initialState = {
    username: ''
}

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = initialState;
    }

    componentDidMount() {
        this.loadUsername();
        console.log("did mount")
    }

    loadUsername = async() => {
        const name = await SecureStore.getItemAsync("userName");
        this.setState({username: name})
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Text style={styles.bigText}>Witaj</Text>
                <Text style={styles.bigText}>{this.state.username}</Text>
            </View>
        )
    }
}

export default Home;