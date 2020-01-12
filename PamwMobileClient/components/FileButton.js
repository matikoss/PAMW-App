import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import styles from './styles/styles';
import RNFetchBlob from 'rn-fetch-blob';


class FileButton extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDownload = async () => {
        let dirs = RNFetchBlob.fs.dirs;
        console.log(this.props.fileAddress);
        RNFetchBlob
            .config({
                fileCache: true,
                appendExt: 'pdf',
                // path: dirs.DownloadDir + `/${this.props.fileName}`,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    title: `${this.props.fileName}`,
                    description: 'Downloading...',
                    mime: 'application/pdf',
                    mediaScannable: true,
                    notification: true,
                    path: dirs.DownloadDir + `/${this.props.fileName}`
                }
            })
            .fetch('GET', `http://10.0.2.2:3001${this.props.fileAddress}`, {
                Authorization: `Bearer ${this.props.accessToken}`
            })
            .then((res) => {
                console.log('The file saved to ', res.path())
            })
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