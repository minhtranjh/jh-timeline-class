import React, { Component } from "react";
import "./MemberAvatar.css";
class MemberAvatar extends Component {
  render() {
    const { picture, name, func } = this.props;

    func();

    return (
      <div className="avatar-box">
        <img className="avatar" src={picture} alt={`${name}'s avatar`} />
      </div>
    );
  }
}

export default MemberAvatar;
