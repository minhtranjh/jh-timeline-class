import React, { Component } from "react";
import NavbarItem from "../NavbarItem/NavbarItem";
class NavbarList extends Component {
  render() {
      const {handleToggleMenu} = this.props
    return (
      <ul className="nav-list">
        <NavbarItem onClick={handleToggleMenu} path="/" label="Home" />
        <NavbarItem onClick={handleToggleMenu} path="/members" label="Our Members" />
        <NavbarItem onClick={handleToggleMenu} path="/tree" label="Our Organization" />
      </ul>
    );
  }
}

export default NavbarList;
