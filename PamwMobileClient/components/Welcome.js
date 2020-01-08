import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';
import styles from './styles/styles';

class Welcome extends Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.mainView}>
                <Text style={styles.bigText}>Welcome!</Text>
                <View style={styles.buttonView}>
                    <Button title="Login" onPress={() => navigate('Login')}/>
                    <Text>No account yet?</Text>
                    <Button title="Register" onPress={() => navigate('Register')}/>
                </View>
            </View>
        )
    }
}
export default Welcome;
