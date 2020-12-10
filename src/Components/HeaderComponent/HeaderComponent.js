import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <Link to="/">CineCup</Link><br/>
                <Link to="/login">Login</Link><br/>
                <Link to="/signup">Signup</Link><br/>
                <Link to="/dashboard">DashBoard</Link><br/>
                <Link to="/search">Search</Link><br/>
            </div>
        );
    }
}

export default HeaderComponent;