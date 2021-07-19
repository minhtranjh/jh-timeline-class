import React, { Component } from 'react';
import './HamburgerButton.css'
class HamburgerButton extends Component {
    render() {
        const {handleToggleMenu,isOpen} = this.props
        return (
            <button onClick={handleToggleMenu} className={isOpen ? "hamburger-button is-open" : "hamburger-button"}>
                <div className="stack"></div>
                <div className="stack"></div>
                <div className="stack"></div>
            </button>
        );
    }
}

export default HamburgerButton;