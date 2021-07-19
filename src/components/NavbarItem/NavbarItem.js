import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./NavbarItem.css"
class NavbarItem extends Component {
  render() {
    const { path, label,onClick } = this.props;
    return (
      <li className="nav-item">
        <NavLink onClick={onClick} className="nav-link" to={path}>
          {label}
        </NavLink>
      </li>
    );
  }
}

export default NavbarItem;
