import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import styles from './styles/styles';

class FileButton extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDownload = async () => {

    }

    handleDelete = async () => {
        this.props.handleDelete(this.props.fileAddress, this.props.fileName)
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