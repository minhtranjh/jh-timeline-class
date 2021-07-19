import React, { Component } from "react";
import TimelineDetail from "../TimelineDetail/TimelineDetail";
import TimelineDatetime from "../TimelineDatetime/TimelineDatetime";
import "./TimelineItem.css";
class TimelineStreamItem extends Component {
  render() {
    const { members, isRight } = this.props;
    return (
      <div className="timeline-item">
        <TimelineDatetime joinedDate={members.joinedDate} />
        <TimelineDetail members={members.members} isRight={isRight} />
      </div>
    );
  }
}

export default TimelineStreamItem;
