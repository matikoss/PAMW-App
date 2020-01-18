import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import FileAttachButton from './FileAttachButton';
import styles from './styles/styles';
import * as SecureStore from 'expo-secure-store';

const initialState = {
    userId: null,
    accessToken: null,
    title: '',
    author: '',
    description: '',
    edit: false,
    attachMode: false,
    fileToAttachName: '',
    attachedFiles: []

}

class BibliographicDetails extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', this.handleDidFocus)
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
        console.log(this.state.title);
    }

    componentWillUnmount() {
        this.focusListener.remove();
        this.backHandler.remove();
    }

    setBiblioDetails() {
        const { params } = this.props.navigation.state;
        const title = params.title;
        const author = params.author;
        const description = params.description;
        const files = params.files;
        this.setState({ title: title, author: author, description: description, attachedFiles: files });
    }

    setStorageData = async () => {
        const token = await SecureStore.getItemAsync("accessToken");
        const id = await SecureStore.getItemAsync("userId");
        this.setState({ userId: id, accessToken: token });
    }

    handleBackPress = () => {
        this.props.navigation.navigate('User');
        console.log(this.state.title)
        return true;
    }

    handleDidFocus = () => {
        this.setState({ edit: false });
        this.setBiblioDetails();
        this.setStorageData();
    }

    onAuthorChange = (value) => {
        this.setState({ author: value })
    }

    onDescriptionChange = (value) => {
        this.setState({ description: value })
    }

    onFileAttachChange = (value) => {
        this.setState({ fileToAttachName: value })
    }

    updateBiblioPos = async () => {
        const { title, author, description, attachedFiles } = this.state;
        const updateData = JSON.stringify({
            title: title,
            author: author,
            description: description,
            files: attachedFiles
        });
        try {
            const response = await fetch(`http://10.0.2.2:3001/biblio/${this.state.userId}/${this.state.title}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${this.state.accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: updateData
            });
            if (!response.ok) {
                throw Error("Problem with biblio update.")
            } else {
                const data = await response.json();
                console.log(data);
                this.setState({ edit: false });
            }
        } catch (err) {
            console.log(err);
        }
    }

    deleteBiblioPos = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3001/biblio/${this.state.userId}/${this.state.title}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.state.accessToken}`,
                    'Accept': 'application/json',
                }
            })
            if (!response.ok) {
                return
            } else {
                console.log(response);
            }
        } catch (err) {
            console.log(err);
        }
    }

    onApplyEdit = () => {
        this.updateBiblioPos();
    }

    onDelete = () => {
        this.deleteBiblioPos();
        this.setState({ edit: false });
        this.props.navigation.navigate('User');
    }

    onAttachFileButtonPress = () => {
        this.setState({ attachMode: true })
    }

    onAttachButtonPress = async () => {
        const fileToAttache = this.state.fileToAttachName;
        console.log(fileToAttache);
        if (this.state.attachedFiles.indexOf(fileToAttache) > -1) {
            return
        }

        try {
            const response = await fetch(`http://10.0.2.2:3001/files/${this.state.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.state.accessToken}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data)
            if (data.filter(file => file.name === fileToAttache).length === 0) {
                return
            } else {
                const newArray = this.state.attachedFiles;
                newArray.push(fileToAttache)
                this.setState({ attachedFiles: newArray });
                this.updateBiblioPos()
                this.setState({ fileToAttachName: '', attachMode: false })
            }

        } catch (err) {
            console.log(err);
        }
    }

    handleAttacheDelete = (fileName) => {
        const tmpArray = this.state.attachedFiles;
        tmpArray.splice(tmpArray.indexOf(fileName), 1);
        this.setState({ attachedFiles: tmpArray });
        this.updateBiblioPos();
    }

    onCancleAttachButtonPress = () => {
        this.setState({ attachMode: false })
    }

    render() {
        let attachForm = <View style={styles.biblioButtonContainer}>
            <Button
                title={"Attach file"}
                color="green"
                onPress={this.onAttachFileButtonPress}
            />
        </View>
        if (this.state.attachMode) {
            attachForm = <View>
                <TextInput
                    placeholder={'Filename'}
                    value={this.state.FileToAttachName}
                    style={styles.biblioInput}
                    onChangeText={this.onFileAttachChange}
                />
                <Button
                    title={"Attach"}
                    color="green"
                    onPress={this.onAttachButtonPress}
                />
                <Button
                    title={"Cancel"}
                    color="red"
                    onPress={this.onCancleAttachButtonPress}
                />
            </View>
        }
        let attachedFiles = <Text>No files attached</Text>
        if (this.state.attachedFiles.length > 0) {
            attachedFiles = null;
        }
        return (
            <View style={styles.mainView}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContainerStyle}
                    style={styles.scrollViewStyle}>
                    <Text style={styles.mediumText}>Bibliographic position details</Text>
                    <Text>Title:</Text>
                    <TextInput
                        value={this.state.title}
                        placeholder={'Title'}
                        style={styles.biblioInput}
                        editable={false}
                    />
                    <Text>Author:</Text>
                    <TextInput
                        value={this.state.author}
                        onChangeText={this.onAuthorChange}
                        placeholder={'Author'}
                        style={styles.biblioInput}
                        editable={this.state.edit}
                    />
                    <Text>Description:</Text>
                    <TextInput
                        value={this.state.description}
                        onChangeText={this.onDescriptionChange}
                        placeholder={'Description'}
                        numberOfLines={5}
                        multiline={true}
                        style={styles.biblioInput}
                        editable={this.state.edit}
                    />
                    <View style={styles.biblioButtonContainer}>
                        <Button
                            title={"Edit"}
                            onPress={() => { this.setState({ edit: !this.state.edit }) }}
                        />
                    </View>
                    <View style={styles.biblioButtonContainer}>
                        <Button
                            disabled={!this.state.edit}
                            title={"Apply"}
                            onPress={this.onApplyEdit}
                        />
                    </View>
                    <View style={styles.biblioButtonContainer}>
                        <Button
                            disabled={!this.state.edit}
                            title={"Delete"}
                            onPress={this.onDelete}
                            color="red"
                        />
                    </View>
                    <Text style={styles.mediumText}>Attached files:</Text>
                    {attachedFiles}
                    {this.state.attachedFiles.map(file => (
                        <FileAttachButton key={file} fileName={file} handleAttacheDelete={this.handleAttacheDelete} />
                    ))}
                    {attachForm}
                </ScrollView>
            </View>
        )
    }
}

export default BibliographicDetails;