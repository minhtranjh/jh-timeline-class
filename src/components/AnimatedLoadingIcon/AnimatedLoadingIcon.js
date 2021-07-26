import React, { Component } from "react";
import "./AnimatedLoadingIcon.css";
class AnimatedLoadingIcon extends Component {
  render() {
    return (
      <div className={`loadingIcon ${this.props.color}`}>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default AnimatedLoadingIcon;
