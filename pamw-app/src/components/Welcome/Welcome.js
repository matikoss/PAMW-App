import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div>
        <h1>Welcome!</h1>
        <Link to="/register">
            <button type="button" className="btn btn-primary">Register</button>
        </Link>
        <Link to="/login">
            <button type="button" className="btn btn-primary">Sign in</button>
        </Link>
    </div>
);
