import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles/styles';
import * as DocumentPicker from 'expo-document-picker';
import * as SecureStore from 'expo-secure-store';
import FileButton from './FileButton';

class Files extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            fileToUpload: null,
            fileToUploadName: '',
            accessToken: null,
            userId: null,
            isUploading: false,
            files: []
        }
    }

    componentDidMount = async () => {
        await this.setStorageData();
        await this.loadUserFiles();
        console.log(this.state.files)
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
        this.setState({isUploading: true});
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
                        const newFiles = tmpFiles.concat(data);
                        console.log(tmpFiles)
                        console.log(data)
                        this.setState({ files: newFiles });
                        console.log(this.state.files)
                    }
                    this.setState({ fileToUpload: null, fileToUploadName: '' })
                })
        } catch (error) {
            console.log(error)
        }
        this.setState({isUploading: false});
    }

    handleDelete = async (address, fileName) => {
        console.log(address)
        fetch(`http://10.0.2.2:3001${address}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.state.accessToken}`
            }
        })
            .then((response) => {
                if (!response.ok) {
                    return
                } else {
                    console.log(response);
                    let tmpFiles = this.state.files;
                    const newFiles = tmpFiles.filter((file) => file.name !== fileName)
                    this.setState({ files: newFiles })
                }
            })
    }

    handleSelectFile = async () => {
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
        let FilesList = <Text>No files uploaded.</Text>
        let uploadInfo = 'Choose file to upload.'
        if (this.state.fileToUpload !== null) {
            uploadInfo = this.state.fileToUploadName
        }
        if (this.state.files.length > 0) {
            FilesList = <FlatList
                data={this.state.files}
                renderItem={({ item }) => (<FileButton fileAddress={item.file} fileName={item.name} handleDelete={this.handleDelete} />)}
                keyExtractor={item => item.name}
                extraData={this.state}
            />
        }
        return (
            <View style={styles.mainView}>
                {/* {this.state.files.map(file => (
                        <FileButton key={file.name}  fileAddress={file.file} fileName={file.name} />
                    ))} */}
                <Text style={styles.mediumText}>Your files:</Text>
                {FilesList}
                <TouchableOpacity onPress={this.handleSelectFile} style={styles.uploadOpacity}>
                    <Text>{uploadInfo}</Text>
                </TouchableOpacity>
                <Button title={'Upload file'} onPress={this.handleFileUpload} />
            </View>
        )
    }
}

export default Files;