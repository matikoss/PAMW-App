import React, { Component, createContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';

// create the context
export const Auth0Context = createContext();

// create a provider
export class Auth0Provider extends Component {
    state = {
        auth0Client: null,
        isLoading: true,
        isAuthenticated: false,
        user: null,
        token: null,
        canChangeRoute: false
    };
    config = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin
    };

    componentDidMount() {
        this.initializeAuth0();
    }

    initializeAuth0 = async () => {
        const auth0Client = await createAuth0Client(this.config);
        this.setState({ auth0Client });

        if (window.location.search.includes('code=')) {
            return this.handleRedirectCallback();
        }

        const isAuthenticated = await auth0Client.isAuthenticated();
        const user = isAuthenticated ? await auth0Client.getUser() : null;
        const token = isAuthenticated ? await auth0Client.getIdTokenClaims() : null;
        this.setState({ isLoading: false, isAuthenticated, user, token });

    };

    handleRedirectCallback = async () => {
        this.setState({ isLoading: true });

        await this.state.auth0Client.handleRedirectCallback();
        const user = await this.state.auth0Client.getUser();
        const token = await this.state.auth0Client.getIdTokenClaims();
        this.setState({ user, token, isAuthenticated: true, isLoading: false });
        window.history.replaceState({}, document.title, window.location.pathname);
        this.handleLoginWithOAuth();
        console.log(token);
    };

    handleLoginWithOAuth = async () => {
        const tokenToSend = this.state.token;
        fetch('http://localhost:3000/login/auth0', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            credentials: "include",
            body: JSON.stringify(tokenToSend)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                } else return response.json();
            })
            .then((responseObject) => {
                console.log(responseObject)
                
                this.setState({canChangeRoute: true})
                console.log("Po ciasteczku")
            })
            .catch((error) => {
                console.log('error: ' + error);
            })
    }

    render() {
        const { auth0Client, isLoading, isAuthenticated, user } = this.state;
        const { children } = this.props;

        const configObject = {
            isLoading,
            isAuthenticated,
            user,
            loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
            getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
            getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
            logout: (...p) => auth0Client.logout(...p)
        };

        return (
            <Auth0Context.Provider value={configObject}>
                {children}
            </Auth0Context.Provider>
        );
    }
}