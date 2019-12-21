import React, { Component } from 'react';
import './Files.css'

class Files extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: 'testowy',
            links: []
        }
    }
    render() {
        return (
            <div>
                <nav class="navbar navbar-light bg-light">
                    <span className="navbar-brand mb-0 h1">Hello {this.state.username} </span>
                    <button className="btn btn-outline-success my-2 my-sm-0">Log out</button>
                </nav>
                <div className="d-flex p-2">
                    <div class="custom-file">
                        <input type="file" className="custom-file-input" id="customFile" />
                        <label className="custom-file-label" for="customFile">Choose pdf file to upload!</label>
                    </div>
                    <button id="uploadBtn" className="btn btn-primary">Upload</button>
                </div>
                {this.state.links.map(link => (
                    <a href={link}>Click to download pdf.</a>
                ))}
            </div>
        )
    }
}

export default Files