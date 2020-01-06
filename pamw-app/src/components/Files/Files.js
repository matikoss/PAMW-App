import React, { Component } from 'react';
import download from 'downloadjs';
import './Files.css'

const FileButton = ({ handleDownload, fileAddress, fileName }) => (
    <div>
        <button onClick={() => handleDownload(fileAddress, fileName)} className="btn btn-primary">{fileName}</button>
    </div>
);

class Files extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: null,
            isUploading: false,
            files: [],
            test: false
        }
    }

    componentDidMount = async () => {
        console.log("leci didMount")
        try {
            const response = await fetch(`http://localhost:3001/files/${this.props.userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.props.accessToken}`,
                    'Accept': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            const fileArray = data;
            this.setState({ files: fileArray })
            console.log(this.state.files);
        } catch (err) {
            console.log(err);
        }
    }

    onLogoutClick = (event) => {
        event.preventDefault();
        fetch("http://localhost:3000/login", {
            method: 'delete',
            credentials: "include"
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Problem with logout");
                } else return response.json();
            })
            .then((responseObject) => {
                console.log("Logged out user: " + responseObject.username)
                this.props.onRouteChange('welcome');
                this.props.setTokens(null, null);
                this.props.setCurrentUser(null, null);
            })
            .catch((error) => {
                console.log('error: ' + error);
            })
    }

    handleUpload = async e => {
        this.setState({ isUploading: true });
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        try {
            fetch(`http://localhost:3001/files/${this.props.userId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.props.accessToken}`,
                    'Accept': 'application/json'
                },
                body: formData
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data);
                    if (this.state.files.filter(file => file.name === data.name).length === 0) {
                        let tmpFiles = this.state.files;
                        tmpFiles.concat(data);
                        this.setState({ files: tmpFiles });
                    }
                })
        } catch (error) {
            console.log(error);
        }
        this.setState({ isUploading: false });
    }

    handleDownload = async (address, fileName) => {
        fetch(address, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.props.accessToken}`
            }
        })
        .then((response) => {
            const blob = response.blob();
            download(blob, fileName);
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Hello {this.props.currentUser} </span>
                    <button onClick={this.onLogoutClick} className="btn btn-outline-success my-2 my-sm-0">Log out</button>
                </nav>
                <div className="d-flex p-2">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" accept=".pdf" multiple onChange={this.handleUpload} />
                        <label className="custom-file-label" htmlFor="customFile">Choose pdf file to upload!</label>
                    </div>
                    <button id="uploadBtn" className="btn btn-primary">Upload</button>
                </div>
                <div>
                    {this.state.files.map(file => (
                        <FileButton key={file.name} handleDownload={this.handleDownload} fileAddress={file.file} fileName={file.name} />
                    ))}
                </div>
            </div>
        )
    }
}

export default Files