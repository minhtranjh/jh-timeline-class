import React, { Component } from "react";
import "./TimelineDatetime.css";
class TimelineDatetime extends Component {
  constructor(props) {
    super(props);
    this.handleToggleRollingDownList =
      this.handleToggleRollingDownList.bind(this);
  }
  handleToggleRollingDownList(e) {
    const { index } = this.props;
    const listEl = document.querySelectorAll(".popup-details")[index];
    listEl.classList.toggle("isHovering");
  }
  render() {
    const { joinedDate } = this.props;
    return (
      <div className="datetime-item">
        <div
          onMouseLeave={this.handleToggleRollingDownList}
          onMouseEnter={this.handleToggleRollingDownList}
          className="dot"
        >
          <div className="eclipse"></div>
          <div className="eclipse"></div>
          <div className="eclipse"></div>
          <div className="eclipse"></div>
        </div>
        <p className="datetime">{joinedDate}</p>
        <div className="line"></div>
      </div>
    );
  }
}

export default TimelineDatetime;
