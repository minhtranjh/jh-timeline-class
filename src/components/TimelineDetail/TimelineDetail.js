import React, { Component } from "react";
import RollingDownMemberList from "../RollingDownMemberList/RollingDownMemberList";
import "./TimelineDetail.css";
class TimelineDetail extends Component {
  render() {
    const { isRight, members } = this.props;
    return (
      <div className={isRight ? "timeline-card left" : "timeline-card right"}>
        <div className="card-title">
          <p>
            {" "}
            {members.length > 1
              ? `${members.length} Members `
              : members[0].name + " "}
            has joined
          </p>
        </div>
          <RollingDownMemberList members={members}/>
      </div>
    );
  }
}

export default TimelineDetail;
