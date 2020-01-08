import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity } from 'react-native';
import styles from './styles/styles';
import * as DocumentPicker from 'expo-document-picker';

class Files extends Component {
    handelSelectFile = async () => {
        try{
            const file = await DocumentPicker.getDocumentAsync({type: 'application/pdf'})
            if(file.type === 'success'){
                console.log(file);
            }
        }catch(error){

        }
    }

    render(){
        return(
            <View style={styles.mainView}>
                <Text >Files</Text>
                <TouchableOpacity onPress={this.handelSelectFile} style={styles.uploadOpacity}>
                    <Text>Select file to upload.</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Files;