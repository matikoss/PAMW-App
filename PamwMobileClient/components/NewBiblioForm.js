import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, FlatList, BackHandler } from 'react-native';
import styles from './styles/styles';

class NewBiblioForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            description: '',
        }
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleBackPress = () => {
        this.props.navigation.navigate('User');
        return true;
    }

    onTitleChange = (value) => {
        this.setState({ title: value })
    }

    onAuthorChange = (value) => {
        this.setState({ author: value })
    }

    onDescriptionChange = (value) => {
        this.setState({ description: value })
    }

    onAddButtonPress = () => {
        const newBiblio = JSON.stringify({
            title: this.state.title,
            author: this.state.author,
            description: this.state.description
        })
        const { params } = this.props.navigation.state;
        params.addBibliographicPos(newBiblio);
        this.setState({ title: '', author: '', description: '' });
        this.props.navigation.navigate('User');
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Text>Add new bibliographic position</Text>
                <TextInput
                    value={this.state.title}
                    onChangeText={this.onTitleChange}
                    placeholder={'Title'}
                    style={styles.biblioInput}
                />
                <TextInput
                    value={this.state.author}
                    onChangeText={this.onAuthorChange}
                    placeholder={'Author'}
                    style={styles.biblioInput}
                />
                <TextInput
                    value={this.state.description}
                    onChangeText={this.onDescriptionChange}
                    placeholder={'Description'}
                    numberOfLines={5}
                    multiline={true}
                    style={styles.biblioInput}
                />
                <Button
                    title={'Add'}
                    onPress={this.onAddButtonPress}
                />
            </View>
        )
    }
}

export default NewBiblioForm;