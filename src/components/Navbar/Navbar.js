import React, { Component } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo-white.png";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import NavbarList from "../NavbarList/NavbarList";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
  }
  handleToggleMenu() {
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  }
  render() {
    const { isOpen } = this.state;
    return (
      <div className="navbar">
        <div className="logo-area">
          <img src={logo} alt="journey horizon logo" />
          <p>Journey Horizon</p>
        </div>
        <div
          className={isOpen ? "navlist-wrapper is-active" : "navlist-wrapper"}
        >
          <NavbarList handleToggleMenu={this.handleToggleMenu} />
        </div>
        <div className="hamburger-wrapper">
          <HamburgerButton
            isOpen={isOpen}
            handleToggleMenu={this.handleToggleMenu}
          />
        </div>
      </div>
    );
  }
}

export default Navbar;
