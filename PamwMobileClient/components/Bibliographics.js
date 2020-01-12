import React, { Component } from 'react';
import { View, TextInput, Text, Button, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles/styles';
import * as SecureStore from 'expo-secure-store';

class Bibliographics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            accessToken: null,
            biblio: []
        }
    }

    componentDidMount = async () => {
        await this.setStorageData();
        await this.loadBibliographics();
    }

    setStorageData = async () => {
        const token = await SecureStore.getItemAsync("accessToken");
        const id = await SecureStore.getItemAsync("userId");
        this.setState({ userId: id, accessToken: token });
    }

    loadBibliographics = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3001/biblio/${this.state.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.state.accessToken}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            this.setState({ biblio: data })
        } catch (error) {
            console.log(error);
        }
    }

    addBibliographicPos = async (newPosition) => {
        console.log(newPosition)
        try {
            const response = await fetch(`http://10.0.2.2:3001/biblio/${this.state.userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.state.accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: newPosition
            });
            if (!response.ok) {
                throw Error("Problem with biblio add.")
            } else {
                const data = await response.json();
                if (this.state.biblio.filter(bibl => bibl.title === data.title).length === 0) {
                    let tmpBiblio = this.state.biblio;
                    const newBiblio = tmpBiblio.concat(data);
                    this.setState({ biblio: newBiblio });
                    console.log(this.state.biblio);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    handleAddBiblioButton = () => {
        const { navigate } = this.props.navigation;
        navigate('BiblioForm', {
            'addBibliographicPos': this.addBibliographicPos.bind(this)
        });
    }

    handleBiblioButtonPress = (title, author, description, files) => {
        const { navigate } = this.props.navigation;
        console.log(title)
        console.log(author)
        console.log(description)
        console.log(files)
        navigate('BiblioDetails', {
            title: title,
            author: author,
            description: description,
            files: files
        });
    }



    render() {
        let BiblioList = <Text>No bibliographic positions created.</Text>
        if (this.state.biblio.length > 0) {
            BiblioList = <FlatList
                data={this.state.biblio}
                renderItem={({ item }) => (
                    <View style={styles.biblioButtonContainer}>
                        <Button
                            title={item.title}
                            onPress={() => this.handleBiblioButtonPress(item.title, item.author, item.description, item.files)}
                        />
                    </View>)}
                keyExtractor={item => item.title}
                extraData={this.state}
            />
        }
        return (
            <View style={styles.mainView}>
                <Text style={styles.mediumText}>Your bibliographic positions:</Text>
                {BiblioList}
                <View>
                    <Button
                        title="Add new bibliographic position"
                        onPress={this.handleAddBiblioButton}
                        color="green"
                    />
                </View>
            </View>
        )
    }
}

export default Bibliographics