import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import BubbleBackground from "../BubbleBackground/BubbleBackground";
import Footer from '../Footer/Footer';

class Layout extends Component {
    render() {
        return (
            <>
            <Navbar />
            <BubbleBackground/>
            {this.props.children}
            <Footer/>
            </>
        );
    }
}

export default Layout;