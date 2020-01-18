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
                    <View style={styles.loginRegisterButton}>
                        <Button title="Login" onPress={() => navigate('Login')} />
                    </View>
                    <Text>No account yet?</Text>
                    <View style={styles.loginRegisterButton}>
                        <Button title="Register" onPress={() => navigate('Register')} />
                    </View>
                </View>
            </View>
        )
    }
}
export default Welcome;
