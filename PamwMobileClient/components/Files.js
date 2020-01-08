import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import styles from './styles/styles';
import * as DocumentPicker from 'expo-document-picker';
import * as SecureStore from 'expo-secure-store';

class Files extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileToUpload: null,
            fileToUploadName: '',
            accessToken: null,
            userId: null,
            files: []
        }
    }

    componentDidMount = async () => {
        await this.setStorageData();
        await this.loadUserFiles();
    }

    setStorageData = async () => {
        const token = await SecureStore.getItemAsync("accessToken");
        const id = await SecureStore.getItemAsync("userId");
        this.setState({ userId: id, accessToken: token });
    }

    loadUserFiles = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3001/files/${this.state.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.state.accessToken}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            const fileArray = data;
            this.setState({ files: fileArray });
            console.log(this.state.files);
        } catch (error) {
            console.log(error);
        }
    }

    handleFileUpload = async () => {
        if (this.state.fileToUpload === null) return;
        const fileToUpload = this.state.fileToUpload;
        const formData = new FormData();
        formData.append('file', {
            uri: fileToUpload.uri,
            type: 'application/pdf',
            name: fileToUpload.name
        });
        console.log(this.state.accessToken);
        try {
            fetch(`http://10.0.2.2:3001/files/${this.state.userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.state.accessToken}`,
                    'Accept': 'application/json'
                },
                body: formData
            })
                .then(response => response.json())
                .then((data) => {
                    if (this.state.files.filter(file => file.name === data.name).length === 0) {
                        let tmpFiles = this.state.files;
                        tmpFiles.concat(data);
                        this.setState({ files: tmpFiles });
                    }
                })
        } catch (error) {

        }
    }

    handelSelectFile = async () => {
        try {
            const file = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' })
            if (file.type === 'success') {
                this.setState({ fileToUpload: file, fileToUploadName: file.name });
            }
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let uploadInfo = 'Choose file to upload.'
        if (this.state.fileToUpload !== null) {
            uploadInfo = this.state.fileToUploadName
        }
        return (
            <View style={styles.mainView}>
                <TouchableOpacity onPress={this.handelSelectFile} style={styles.uploadOpacity}>
                    <Text>{uploadInfo}</Text>
                </TouchableOpacity>
                <Button title={'Upload file'} onPress={this.handleFileUpload} />
                <Text style={styles.mediumText}>Your files:</Text>
            </View>
        )
    }
}

export default Files;