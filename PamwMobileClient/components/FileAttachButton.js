import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import styles from './styles/styles';

class FileAttachButton extends Component {
    constructor(props) {
        super(props);
        this.handleAttacheDelete = this.handleAttacheDelete.bind(this);
    }

    handleDownload = async () => {

    }

    handleAttacheDelete = async () => {
        this.props.handleAttacheDelete(this.props.fileName)
    }

    render() {
        return (
            <View style={styles.fileContainer}>
                <Button
                    title={this.props.fileName}
                    onPress={this.handleDownload}
                />
                <Button
                    title={"Del"}
                    onPress={this.handleAttacheDelete}
                    color="red"
                />
            </View>
        )
    }
}

export default FileAttachButton;