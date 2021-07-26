import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import linkedIcon from "../../assets/images/download (1).svg";
import faceIcon from "../../assets/images/download (2).svg";

import instaIcon from "../../assets/images/download (3).svg";

import pinterIcon from "../../assets/images/download (4).svg";

import twitter from "../../assets/images/download (5).svg";
import "./Footer.css";
class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <NavLink to="/">
          <img src={linkedIcon} alt="JH linkedin" />
        </NavLink>
        <NavLink to="/">
          <img src={instaIcon} alt="JH Instagram" />
        </NavLink>
        <NavLink to="/">
          <img className="facebookIcon" src={faceIcon} alt="JH Facebook" />
        </NavLink>
        <NavLink to="/">
          <img src={pinterIcon} alt="JH Pinterest" />
        </NavLink>
        <NavLink to="/">
          <img src={twitter} alt="JH Twitter" />
        </NavLink>
      </div>
    );
  }
}

export default Footer;
