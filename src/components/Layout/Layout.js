import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';

class Layout extends Component {
    render() {
        return (
            <>
            <Navbar />
            {this.props.children}
            </>
        );
    }
}

export default Layout;