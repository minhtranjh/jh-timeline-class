import React, { Component } from "react";
import './TimelineDatetime.css'
class TimelineDatetime extends Component {
  render() {
    const {joinedDate} = this.props
    return (
      <div className="datetime-item">
        <div className="dot"></div>
        <p className="datetime">{joinedDate}</p>
        <div className="line"></div>
      </div>
    );
  }
}

export default TimelineDatetime;
