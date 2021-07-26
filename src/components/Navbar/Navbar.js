import React, { Component } from "react";
import "./Navbar.css";
import logo from "../../assets/images/logo-white.png";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import NavbarList from "../NavbarList/NavbarList";
import { NavLink } from "react-router-dom";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleToggleMenu = this.handleToggleMenu.bind(this);
  }
  handleToggleMenu() {
    this.handleStopScrolling()
    this.setState((state) => ({
      isOpen: !state.isOpen,
    }));
  }
  handleStopScrolling(){
        document.body.style.overflow = this.state.isOpen ? "unset" : "hidden";
  }
  render() {
    const { isOpen } = this.state;
    return (
      <div className="navbar">
        <NavLink to="/" className="logo-area">
          <img src={logo} alt="journey horizon logo" />
          <p>Journey Horizon</p>
        </NavLink>
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
