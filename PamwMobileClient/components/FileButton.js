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
            <View style={styles.fileContainer}>
                <Button
                    title={this.props.fileName}
                    onPress={this.handleDownload}
                />
                <Button
                    title={"Del"}
                    onPress={this.handleDelete}
                    color="red"
                />
            </View>
        )
    }

}

export default FileButton;