import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from './contexts/auth0-context';
import * as serviceWorker from './serviceWorker';




ReactDOM.render(
    <Auth0Provider>
        <App />
    </Auth0Provider>,
    document.getElementById('root')
);

// FOR TESTING, remove before production
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
