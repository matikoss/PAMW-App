import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import styles from './styles/styles';

class FileButton extends Component {
    constructor(props) {
        super(props);
    }

    handleDownload = async () => {

    }

    render() {
        return (
            <Button
                title={this.props.fileName}
                onPress={this.handleDownload}
            />
        )
    }

}

export default FileButton;