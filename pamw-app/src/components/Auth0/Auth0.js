import React, { useContext } from 'react';
import { Auth0Context } from '../../contexts/auth0-context'
import './Auth0.css'


const Auth0 = (props) => {
    const { isLoading, user, loginWithRedirect, logout, token, canChangeRoute } = useContext(Auth0Context);
    const handleLoginAuth0 = () => {
        loginWithRedirect();
    }
    const changeRouteToFiles = () => {
        console.log("HALO RUTER")
        props.onRouteChange('files')
    }
    return (
        <div className="auth-container">
            {!isLoading && !user && (
                <button onClick={handleLoginAuth0} className="btn btn-dark login-button">
                    Login with Auth0
            </button>
            )}
            {!isLoading && user && (
                <>
                    <h1>You are logged in!</h1>
                    <p>Hello {user.name}</p>

                    {user.picture && <img src={user.picture} alt="My Avatar" />}
                    <hr />
                    <button
                        onClick={logout({ returnTo: window.location.origin })}
                        className="btn btn-dark"
                    >
                        Logout
          </button>
                </>
            )}
            {!isLoading && canChangeRoute && (
                <>
                <button onClick={changeRouteToFiles()}></button>
                </>
            )}
        </div>
    )
}

export default Auth0;